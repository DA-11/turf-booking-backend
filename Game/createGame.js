const Game = require('../models/gameModel');
const asyncHandler = require("express-async-handler");

const createGame = asyncHandler(async function(req,res){

    const{username,
        turfName,
        location,
        fromTime,
        toTime,
        players,
        game,
        price,
        booked} = req.body;
    
    // console.log(fromTime);
    console.log("Create game API Called ")
    if(!username ||!turfName || !location || !fromTime || !toTime || !price || !players || !game || (booked === undefined)){
        res.status(404);
        throw new Error("All fields are Mandatory");
    }

    const isSlotAvailable = await timeSlotAvailable(fromTime,toTime,turfName);
    console.log(isSlotAvailable);
    if(isSlotAvailable === true){
        
        const game_doc = await Game.create({
            username,
            turfName,
            location,
            fromTime,
            toTime,
            players,
            game,
            price,
            booked
        });

        res.status(201);
        res.json(game_doc);

    } else {
        res.status(400);
        throw new Error("Time Slot not Available");
    }

});

function timeSlotAvailable(fromTime,toTime,turfName){
    
    return new Promise(async (resolve,reject) => {
        const bookingStartTime = new Date(fromTime).getTime();
    // console.log(bookingStartTime);
        const bookingEndTime = new Date(toTime).getTime();

        const timeDiff = new Date(toTime) - new Date(fromTime);
        
        
        if(timeDiff <= 18000){
            // measuring if the booking is atleast for half an hour 
            // this also ensures that toTime is greater bigger than fromTime
            
           // console.log("time Diff -" + timeDiff)
            resolve(false);
        }

        const fromTimeDate = (fromTime).toString().substring(0,10);
        //console.log(fromTimeDate);
        const games = await Game.find({fromTime: {$gte: new Date(fromTimeDate)},turfName});

        for(let i = 0 ; i < games.length ; i++){
            
            const startTime = games[i].fromTime.getTime();
            const endTime = games[i].toTime.getTime();
            
            // console.log("startTime" + startTime);
            // console.log("endTime" + endTime)

            // console.log("booking startTime" + bookingStartTime);
            // console.log("booking endTime" + bookingEndTime)
            
            if(((bookingEndTime > startTime) && (bookingStartTime <= startTime))
            ||((bookingStartTime >= startTime) && (bookingStartTime < endTime))){
            
                resolve(false);
            }
            
        }
        
        
        resolve(true);
    })
}

module.exports = createGame;

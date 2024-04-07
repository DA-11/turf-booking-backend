const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const updateGame = asyncHandler(async function(req,res){

    const{turfName,fromTime,updatedFromTime,updatedToTime,price,location} = req.body;
    const user = req.user;

    console.log("Update Game API called");
    //const fromTimeDate = fromTime.toString().substring(0,10);
    const games = await Game.find({fromTime: new Date(fromTime),turfName});
    console.log(games)

    if(games.length === 0){
        res.status(404);
        throw new Error("No game found at given Time and Place");
    } 

    if(games[0].username !== user.username){
         res.status(401);
        throw new Error("User not authorized to update this game");
    }
    
    const isTimeSlotAvailable = await timeSlotAvailable(updatedFromTime,updatedToTime,turfName)
    if(isTimeSlotAvailable === true){

        const game = await Game.updateOne({fromTime:new Date(fromTime),turfName},{
            "username" : req.user.username,
            turfName,
            location,
            "fromTime":updatedFromTime,
            "toTime":updatedToTime,
            price
        }) 

        //console.log(game);
        res.status(204);
        res.json(game);

    } else {
        res.status(422);
        res.send("Updated Time slot either not available or was not correct");
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

module.exports = updateGame;

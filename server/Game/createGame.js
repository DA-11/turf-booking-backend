const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const createGame = asyncHandler(async function(req,res){

    const{name,location,fromTime,toTime,price} = req.body;
    // console.log(fromTime);
    console.log("Create game API Called ")
    if(!name || !location || !fromTime || !toTime || !price){
        res.status(404);
        throw new Error("All fields are Mandatory");
    }

    const isSlotAvailable = await timeSlotAvailable(fromTime,toTime,name);
    console.log(isSlotAvailable);
    if(isSlotAvailable === true){
        
        const game = await Game.create({
            "user" : req.user.id,
            name,
            location,
            fromTime,
            toTime,
            price
        });

        res.status(201);
        res.json(game);

    } else {
        res.status(400);
        throw new Error("Time Slot not Available");
    }

});

function timeSlotAvailable(fromTime,toTime,name){
    
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
        const games = await Game.find({fromTime: {$gte: new Date(fromTimeDate)},name});

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

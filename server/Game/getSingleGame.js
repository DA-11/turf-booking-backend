const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const getSingleGame = asyncHandler(async function(req,res){

    const{name,fromTime} = req.body;
    //console.log(typeof(fromTime));
    console.log("Get Single Game API called");

    //const fromTimeDate = fromTime.toString().substring(0,10);
    const games = await Game.find({fromTime:new Date(fromTime),name});

    if(games.length === 0){
        res.status(404);
        throw new Error("No game found at given Time and Place");
    } 

    res.status(200);
    res.json(games);

});

module.exports = getSingleGame;

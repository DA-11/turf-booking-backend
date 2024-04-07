const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const getAllUserGames = asyncHandler(async function(req,res){

    const{username} = req.user;
    //console.log(typeof(fromTime));
    console.log("Get Games API called");

    //const fromTimeDate = fromTime.toString().substring(0,10);
    const games = await Game.find({username});

    if(games.length === 0){
        res.status(404);
        throw new Error("No game found for given user");
    } 

    res.status(200);
    res.json(games);

});

module.exports = getAllUserGames;

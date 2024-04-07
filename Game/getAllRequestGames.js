const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const ObjectId = require('mongodb').ObjectId;

const getAllRequestGames = asyncHandler(async function(req,res){

    const data = req.body;
    const gamesData = data.map((game) => {
        return new ObjectId(game);
    })
    
    console.log(gamesData)
    const game = await Game.find({"_id" :{"$in" : gamesData}});

    if(!game){
        res.status(404);
        throw new Error("No game found");
    } 

    res.status(200);
    res.json(game);

});

module.exports = getAllRequestGames;

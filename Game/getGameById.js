const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const getGameById = asyncHandler(async function(req,res){

    const gameID = req.query.gameID;
    console.log(gameID)
    
    const game = await Game.findOne({gameID});

    if(!game){
        res.status(404);
        throw new Error("No game found at given Time and Place");
    } 

    res.status(200);
    res.json(game);

});

module.exports = getGameById;

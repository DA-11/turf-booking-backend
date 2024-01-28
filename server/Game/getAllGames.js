const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");

const getAllGames =  asyncHandler(async function(req,res){
    const games = await Game.find();
    
    if(games.length === 0){
        res.status(204);
        res.send("No Games Found");
    } else {
        res.status(201);
        res.json(games);
    }

});

module.exports = getAllGames;
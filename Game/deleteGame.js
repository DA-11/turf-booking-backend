const Game = require('../models/gameModel');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const deleteGame = asyncHandler(async function(req,res){

    const{turfName,fromTime} = req.body;
    const user = req.user;

    console.log("Delete Game API called");
    //const fromTimeDate = fromTime.toString().substring(0,10);
    const games = await Game.find({fromTime: new Date(fromTime),turfName});
    console.log(games)
    if(games.length === 0){
        res.status(404);
        throw new Error("No game found at given Time and Place");
    } 

    if(games[0].user.toString() !== user.id){
         res.status(401);
        throw new Error("User not authorized to delete this game");
    }

    const game = await Game.deleteOne({fromTime:new Date(fromTime),turfName}) 
    console.log(game);
    res.status(204);
    res.json("Game Deleted");

});

module.exports = deleteGame;

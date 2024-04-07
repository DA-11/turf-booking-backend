const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const getGamesAfterCurrentTime =  asyncHandler(async function(req,res){
    
    const turfName =  req.query.turfName;
    const date =  req.query.date; 
    const regex = `.*${turfName}.*`
    const games = await Game.find({turfName:{$regex:regex},fromTime:{$gt:new Date(date)}});

    if(!games){
        res.status(400);
        throw new Error("No Games at turf ");
    }

    res.status(201);
    res.json(games);

});



module.exports = getGamesAfterCurrentTime;
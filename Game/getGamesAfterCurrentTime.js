const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const getGamesAfterCurrentTime =  asyncHandler(async function(req,res){

    console.log("Find Game after c time Api Hit");
    const turfName =  req.query.turfName;
    console.log(`turfName = ${turfName}`);
    const date =  req.query.date; 
    console.log(`date = ${date}`);

    const regex = `.*${turfName}.*`
    let games;

    if(turfName === '00'){
        games = await Game.find({fromTime:{$gt:new Date(date)}});
    } else {
        games = await Game.find({turfName : {$regex : regex},fromTime:{$gt:new Date(date)}});
    }

    if(!games){
        res.status(400);
        throw new Error("No Games at turf ");
    }

    res.status(201);
    res.json(games);

});



module.exports = getGamesAfterCurrentTime;

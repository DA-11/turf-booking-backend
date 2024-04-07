const GameRequest = require('../models/gameRequestModel');
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const getRequestingUserGames = asyncHandler(async function(req,res){

    const{username} = req.user;
    // console.log(username)
    // if(!username ){
    //     res.status(400);
    //     throw new Error("Please provide the requesting User username")
    // }

    const gameRequests = await GameRequest.aggregate([
        {$lookup:{
            from:"games",
            localField:"gameID",
            foreignField:"_id",
            as:"gameData"
        }}
    ]);

    const rquestingUserGames = gameRequests.filter((games) => {
        return games.requestingUser === username
    })

    res.status(200);
    res.json(rquestingUserGames);
    
});


module.exports = getRequestingUserGames;

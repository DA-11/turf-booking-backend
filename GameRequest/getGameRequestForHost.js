const GameRequest = require('../models/gameRequestModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const getGameRequestForHost = asyncHandler(async function(req,res){

    const{username} = req.user;
    console.log(username)
    if(!username ){
        res.status(400);
        throw new Error("Please provide the requesting User username")
    }

    const gameRequests = await GameRequest.find({"hostingUser":username});

    res.status(200);
    res.json(gameRequests);
    
});


module.exports = getGameRequestForHost;

const GameRequest = require('../models/gameRequestModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const getGameRequest = asyncHandler(async function(req,res){

    const{requestingUser} = req.query;
    
    if(!requestingUser ){
        res.status(400);
        throw new Error("Please provide the requesting User username")
    }


    const gameRequests = await GameRequest.find({requestingUser});

    res.status(200);
    res.json(gameRequests);
    
});


module.exports = getGameRequest;

const GameRequest = require('../models/gameRequestModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const createGameRequest = asyncHandler(async function(req,res){

    const{gameID,requestingUsername,hostingUsername} = req.body;
    
    if(!gameID || !requestingUsername || !hostingUsername){
        res.status(400);
        throw new Error("Please provide all mandatory details")
    }

    const gameRequestAlreadyPresent = await GameRequest.findOne(
        {gameID,
        "requestingUser":requestingUsername,
        "hostingUser":hostingUsername,});
    
    if(gameRequestAlreadyPresent){
        res.status(400);
        throw new Error("Request Already Sent")
    }

    const requestingUser = await User.findOne({username:requestingUsername});
    const hostingUser = await User.findOne({username:hostingUsername});

    if(!requestingUser || !hostingUser){
        res.status(400);
        throw new Error("Either requesting or hosting user does not exist")
    }

    const gameRequest = await GameRequest.create({
        gameID,
        "requestingUser":requestingUsername,
        "hostingUser":hostingUsername,
        "requestStatus":"pending"
    });

    res.status(200);
    res.json(gameRequest);
    

});


module.exports = createGameRequest;

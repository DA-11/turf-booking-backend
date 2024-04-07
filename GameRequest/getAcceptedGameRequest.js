const GameRequest = require('../models/gameRequestModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const getAcceptedGameRequest = asyncHandler(async function(req,res){

    const{requestingUsername} = req.body;
    
    if(!requestingUsername ){
        res.status(400);
        throw new Error("Please provide the requesting User username")
    }

    const requestingUser = await User.findOne({username:requestingUsername});
   
    if(!requestingUser){
        res.status(400);
        throw new Error("Requesting User does not exist")
    }

    const gameRequests = await GameRequest.find({"requestingUser":requestingUser._id,"requestStatus":"Accepted"});

    res.status(200);
    res.json(gameRequests);
    
});


module.exports = getAcceptedGameRequest;

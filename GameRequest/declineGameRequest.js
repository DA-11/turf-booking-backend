const GameRequest = require('../models/gameRequestModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const ObjectId = require('mongodb').ObjectId;
const declineGameRequest = asyncHandler(async function(req,res){

    const{gameID,requestingUser} = req.query;
    console.log(gameID)
   if(!gameID || !requestingUser){
        res.status(400);
        throw new Error("No Game Id found")
   }
    const gameRequest = await GameRequest.findOneAndUpdate(
        {"gameID":new ObjectId(gameID),
        "requestingUser":requestingUser  
        },
        {"requestStatus":"decline"},
        { returnNewDocument: true }
    );

    

    if(!gameRequest){
        res.status(400);
        throw new Error("No Game found for given Id");
    }

    res.status(200);
    res.json(gameRequest);
    
});


module.exports = declineGameRequest;

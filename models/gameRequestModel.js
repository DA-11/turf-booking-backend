const mongoose = require('mongoose');

const gameRequestSchema = new mongoose.Schema({
    gameID:{
        type:mongoose.Schema.Types.ObjectId, 
        required:[true,"Provide the Game id of associated game"], 
        ref:'Game'
    }
    ,requestingUser:{
        type:String, 
        required:[true,"Provide a user who requested to be part of this game"], 
        ref:'User'
    },
    hostingUser:{
        type:String, 
        required:[true,"Provide a user who hosted this game"], 
        ref:'User'
    },
    requestStatus:{
        type:String,
        required:[true]
    }
});

const GameRequest = mongoose.model('GameRequest', gameRequestSchema);
module.exports = GameRequest;


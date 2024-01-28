const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        required:[true,"Provide a user who hosted this game"], 
        ref:'User'
    },
    name:{
        type:String,
        required:[true,"turf name is a must"]
    },
    location:String,
    fromTime:{
        type:Date,
        required:[true,"Date and time of booking is required"]
    },
    toTime:{
        type:Date,
        required:[true,"tDate and time of booking is required"]
    },
    price:Number

});

const GameSchema = mongoose.model('Game', gameSchema);
module.exports = GameSchema;
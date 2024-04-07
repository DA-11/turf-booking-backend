const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    username:{
        type:String, 
        required:[true,"Provide a user who hosted this game"], 
        ref:'User'
    },
    turfName:{
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
        required:[true,"Date and time of booking is required"]
    },
    players:{
        type:Number,
        required:[true,"No of players coming is required"]
    },
    game:{
        type:String,
        require:[true,"Type of game being played, ex: football, Table tennis, cricket"]
    },
    totalNoOfPlayers:{
        type:Number,
        required:[true,"Total Number of players needed"]
    },
    price:Number,
    booked:Boolean

});

const GameSchema = mongoose.model('Game', gameSchema);
module.exports = GameSchema;
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Place must have a name"]
    },
    location:String,
    mapLocation:String,
    pricePerHour:Number,
    gamesAvailable:[String],
    perks:[String],
    photos:[String],
    contactNumber:Number,
    addditionalInfo:String
});

const PlaceSchema = mongoose.model('Place',placeSchema);
module.exports = PlaceSchema;
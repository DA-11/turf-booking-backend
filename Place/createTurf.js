const Place = require('../models/placeModel');
const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");

const createTurf = asyncHandler(async function(req,res){

    const {name,
        location,
        pricePerHour,
        gamesAvailable,
        perks,
        contactNumber,
        additionalInfo,
        photos,
        mapLocation} = req.body;

    console.log("create Turf api Hit");

    if(!name || !location || !pricePerHour || !contactNumber || !gamesAvailable){
        res.status(400);
        res.json("Name, Location, price/hour, contact number and games available are mandatory fields while creating Turf")
    }

    const turf = await Place.create({
        name,
        location,
        pricePerHour,
        gamesAvailable,
        "perks": perks.length > 0 ? perks : [],
        "photos": photos.length > 0 ? photos : [],
        contactNumber,
        additionalInfo,
        mapLocation        
    })

    res.status(200);
    res.json(turf);

});

module.exports = createTurf;
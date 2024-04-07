const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');

const updateTurf = asyncHandler(async function(req,res){

    const{id,
        name,
        location,
        pricePerHour,
        gamesAvailable,
        perks,
        contactNumber,
        additionalInfo,
        photos} = req.body;
    
    //const regex = `.*${name}.*`;
    //const turfs = await Place.find({name : {$regex : regex}});

    const turf = await Place.find({"_id":id});

    if(turf.length == 0){
        res.status(400);
        res.send("No Turfs with this id found");
    }

    const updatedTurf = await Place.updateOne({"_id":id},{
        name,
        location,
        pricePerHour,
        gamesAvailable,
        perks,
        contactNumber,
        additionalInfo,
        photos
    });

    res.status(201);
    res.json(updatedTurf);
});

module.exports = updateTurf;
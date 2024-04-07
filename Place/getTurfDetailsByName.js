const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');
const ObjectId = require('mongodb').ObjectId;
const getTurfDetailsByName = asyncHandler(async function(req,res){

    const turfName = req.query.turfName;
    console.log(turfName)
    const regex = `.*${turfName}.*`;

    const turf = await Place.find({name : {$regex : regex}});
    
    if(!turf){
        res.status(400);
        throw new Error("No Turfs with this name");
    }

    res.status(201);
    res.json(turf);
});

module.exports = getTurfDetailsByName;
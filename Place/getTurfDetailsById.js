const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');
const ObjectId = require('mongodb').ObjectId;

const getTurfDetailsById = asyncHandler(async function(req,res){

    const id = req.query.id;
    console.log('turf id' + id);
    
    const turf = await Place.findOne({"_id":id});
    
    if(!turf){
        res.status(400);
        throw new Error("No Turfs with this id");
    }

    res.status(201);
    res.json(turf);
});

module.exports = getTurfDetailsById;
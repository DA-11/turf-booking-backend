const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');

const getAllTurfs = asyncHandler(async function(req,res){

    const turfs = await Place.find();

    res.status(201);
    res.json(turfs);
});

module.exports = getAllTurfs;
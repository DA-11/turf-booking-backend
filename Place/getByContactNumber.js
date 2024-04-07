const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');

const getTurfDetailsWithContactNo = asyncHandler(async function(req,res){

    const{number} = req.body;
    const turfs = await Place.find({number});

    if(turfs.length == 0){
        res.status(400);
        res.send("No Turfs with this contact number");
    }

    res.status(201);
    res.json(turfs);
});

module.exports = getTurfDetailsWithContactNo;
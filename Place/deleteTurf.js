const Place = require('../models/placeModel');
const asyncHandler = require('express-async-handler');

const deleteTurf = asyncHandler(async function(req,res){

    const{name} = req.body;
    const regex = `.*${name}.*`;
    const turfs = await Place.find({name : {$regex : regex}});

    if(turfs.length == 0){
        res.status(400);
        res.send("No Turfs with this name");
    }

    res.status(201);
    res.json(turfs);
});

module.exports = deleteTurf;
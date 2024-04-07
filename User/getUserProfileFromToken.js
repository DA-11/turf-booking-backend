const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');

//@desc get User Profile Details
//@route get /user/getUserProfileFromToken
//@Access public

const getUserProfileFromToken = asyncHandler(async function(req,res){

    console.log(req.user);
    res.status(200).json(req.user);

});

module.exports = getUserProfileFromToken;
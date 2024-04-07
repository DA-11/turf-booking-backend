const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

//@desc get User Details
//@route get /user/getUserDetails
//@Access public

const getUserDetails = asyncHandler(async function(req,res){

    const {username} = req.body;

    const user = await User.findOne({username});
    
    if(!user){
        res.status(404).send("Cannot find any user for given username");
    } else {
        res.status(200).json(user);
    }

});

module.exports = getUserDetails;
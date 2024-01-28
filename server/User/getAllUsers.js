const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

//@desc getAllUsers
//@route get /user/getAllUsers
//@Access public

const getAllUsers = asyncHandler(async function(req,res){

    const users = await User.find();
    
    if(!users){
        res.status(404).send("Cannot find any users");
    } else {
        res.status(200).json(users);
    }

});

module.exports = getAllUsers;
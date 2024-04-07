const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

const bcryptSalt = bcrypt.genSaltSync(8);
//@desc logout User
//@route get /user/logout
//@Access public

const logoutUser = asyncHandler(async function(req,res){

    res.cookie('token', ' ').json(true);

});

module.exports = logoutUser;
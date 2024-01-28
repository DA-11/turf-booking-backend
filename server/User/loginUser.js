const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

const bcryptSalt = bcrypt.genSaltSync(8);
//@desc login User
//@route get /user/login
//@Access public

const loginUser = asyncHandler(async function(req,res){

    const {username,password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        res.status(404);
        throw new Error("User not found");
    } 

    const correctPassword = bcrypt.compareSync(password, user.password);
    if(!correctPassword){
        res.status(422);
        throw new Error("Incorrect Password");
    }

    jwt.sign({
        username,
        id:user._id
    },jwtKey,{}, (err,token) => {
        
        if(err){
            throw new Error("some error occurred while signing with JWT");
        }

        console.log(token);
        //res.status(201).cookie('token',token, {secure:true,sameSite:'none'}).json(user);
        res.status(201).json(token);
    })


});

module.exports = loginUser;
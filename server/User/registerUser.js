const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const bcryptSalt = bcrypt.genSaltSync(8);

//@desc Register new User
//@route POST /user/register
//@Access public

const registerUser = asyncHandler(async function(req,res){
    
    const{username,email,password,contactNumber} = req.body;
    console.log(`Register user API hit with username - ${username}`);

    if(!username || !email || !password || !contactNumber){
        res.status(400);
        throw new Error("All fields are Mandatory");
    } 

    
    const userWithUsernameAvailable = await User.findOne({username}); 
    /* using findOne instead of find because find returns a cursor if no document is matched
    and therefore the result cannot be esaily matche in condition,
    findOne returns null if document is not matched */
    

    if(userWithUsernameAvailable){
        res.status(401);
        throw new Error("User with username Already exists");
    } 

    const userWithEmailAvailable = await User.findOne({email}); 
    

    if(userWithEmailAvailable){
        res.status(401);
        throw new Error("User with Email Already exists");
    } 

    const hashedPassword = bcrypt.hashSync(password,bcryptSalt);

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        contactNumber
    });

    res.status(201).json(user);
    
    
})

module.exports = registerUser;
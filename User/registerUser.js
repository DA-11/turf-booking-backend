const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const bcryptSalt = bcrypt.genSaltSync(8);

//@desc Register new User
//@route POST /user/register
//@Access public

const registerUser = asyncHandler(async function(req,res){
    
    const{name,username,email,password,contactNumber,photo_url,oAuth} = req.body;
    console.log(`Register user API hit with username - ${username}`);

    if(!name || !username || !email || oAuth === undefined ){
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

    const user = await User.create({
        name,
        username,
        email,
        oAuth,
        password: password ? bcrypt.hashSync(password,bcryptSalt) : "",
        contactNumber : contactNumber ? contactNumber : 0,
        photo_url : photo_url ? photo_url : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    });

    res.status(201).json(user);
    
    
})

module.exports = registerUser;
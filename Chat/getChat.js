const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

//@desc get Chat 
//@route get /chat/getChat
//@Access public

const getChatDetails = asyncHandler(async function(req,res){

    const user1 = req.query.user1;
    const user2 = req.query.user2;
    
    //const {user2,user1} = req.body
    console.log(req.body)
    console.log(user1);
    console.log(user2);
    
    const chat1 = await Chat.findOne({user1,user2});
    const chat2 = await Chat.findOne({"user2":user1,"user1":user2});
    
    if(chat1 || chat2){
        
        if(chat1){ 
            res.status(200).json(chat1);
        } else {
            res.status(200).json(chat2);
        }
    } else {
        res.status(404).send("Cannot find any chat for given users");

    }

});

module.exports = getChatDetails;
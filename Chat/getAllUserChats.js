const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

//@desc get Chat 
//@route get /chat/getChat
//@Access public

const getAllUserChats = asyncHandler(async function(req,res){

    const user = req.query.user  
    
    if(!user){
        res.status(400);
        throw new Error("User not passed in query parameter");
    }

    const chat1 = await Chat.find({"user1":user});
    const chat2 = await Chat.find({"user2":user});
    
    const chats = chat1.concat(chat2);
    res.status(200).json(chats);
    

});

module.exports = getAllUserChats;
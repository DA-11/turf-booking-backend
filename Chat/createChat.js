const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const bcryptSalt = bcrypt.genSaltSync(8);

//@desc Create new Chat between two users
//@route POST /chat/create
//@Access public

const createChat = asyncHandler(async function(req,res){
    
    const{user1,user2} = req.body;
    console.log("Create chat API hit");

    console.log(user1);
    console.log(user2);
    
    if(!user1 || !user2 ){
        res.status(400);
        throw new Error("Both Users entries are Mandatory to create Chat");
    } 

    const user1Id = await User.findOne({"username":user1});
    const user2Id = await User.findOne({"username":user2});

    if(!user1Id || !user2Id){
        res.status(401);
        throw new Error("Chat Room can only be created for existing users");
    }

    const roomName1 = `${user1}${user2}`;
    const roomName2 = `${user2}${user1}`;
    
    const chatExistWithUser1 = await Chat.findOne({user1,user2});
    const chatExistWithUser2 = await Chat.findOne({"user1":user2,"user2":user1});
    
    if(chatExistWithUser1 || chatExistWithUser2){
        res.status(200);
        res.send("Chat Room Already Exists with these users");
    } else {
        
        const chat = await Chat.create({
            user1,
            user2,
            messages:[],
            roomName1,
            roomName2
        });

        res.status(201).json(chat);
    
    }

})

module.exports = createChat;
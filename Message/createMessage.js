const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const bcryptSalt = bcrypt.genSaltSync(8);

//@desc Create new message between two users
//@route POST /message/create
//@Access public

const createMessage = asyncHandler(async function(req,res){
    
    const{from,to,message,type,mimeType,filename,timestamp} = req.body;
    console.log("Create message API hit");

    if(!from || !to || !message){
        res.status(400);
        throw new Error("Both Users entries and a meassage are Mandatory to create message document");
    } 

    const chatExistWithUser1 = await Chat.findOne({"user1":from,"user2":to});
    const chatExistWithUser2 = await Chat.findOne({"user1":to,"user2":from});
    
    if(chatExistWithUser1 || chatExistWithUser2){

        const messageDoc = await Message.create({
            from,
            to,
            type,
            filename,
            mimeType,
            message,
            "timestamp":new Date(timestamp)
        });

        if(chatExistWithUser1){ 
            let messages = chatExistWithUser1.messages;

            console.log(messages.length);
            let updatedMessages = [...messages,messageDoc];

            const chat = await Chat.updateOne({"user1":from,"user2":to},
            {
                "messages":updatedMessages
            })
        }
        
        if(chatExistWithUser2){
            let messages = chatExistWithUser2.messages;

            console.log(messages);
            let updatedMessages = [...messages,messageDoc];

            const chat = await Chat.updateOne({"user2":from,"user1":to},
            {
                "messages":updatedMessages
            })
        }

        
        res.status(201).json(messageDoc);


    } else {
        
        res.status(400);
        throw new Error("Either chat room or users do not exist");
    
    }

})

module.exports = createMessage;
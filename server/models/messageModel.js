const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   
    from:{
        type:String,
        required:[true,"Username of user who sent this message is madatory"]
    },
    to:{
        type:String,
        required:[true,"Username of user who got this message is madatory"]
    },
    message:{
        type:String,
        required:[true,"Empty String is not considered as message"]
    },
    timestamp:{
        type:Date,
        required:[true,"A timestamp is necessary to determine the order of messages"]
    }

});

const MessageSchema = mongoose.model('Message', messageSchema);
module.exports = MessageSchema;

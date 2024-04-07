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
    type:{
        type:String,
        required:[true,"Message Type is Mandatory"]
    },
    filename:{
        type:String
    },
    mimeType:{
        type:String
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

const groupSchema = new mongoose.Schema({

    admin:{
        type:[mongoose.Schema.Types.ObjectId],
        required:[true,"Every Grouo must have a admin"]
    },
    name:{
        type:String,
        required:[true,"Group must have a name"]
    }, 
    members:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    messages:[messageSchema],
    groupDescription:{
        type:String
    }
});

const GroupSchema = mongoose.model('Group',groupSchema);
module.exports = GroupSchema;
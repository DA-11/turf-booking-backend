const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Provide a unique username']
    },
    username: {
        type:String,
        required:[true,'Provide a unique username'],
        unique:[true,'Unique username required']
    },
    email:{
        type:String,
        required:[true,'Provide a Email Address'],
        unique:[true,'Email must not be used by any other user']
    },
    oAuth:{
        type:Boolean,
        required:[true,'Provide whether user is Logging with Oauth'],
    },
    password:{
        type:String
    },
    contactNumber:{
        type:Number
    },
    photo_url:{
        type:String
    }
    
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);


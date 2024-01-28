const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    password:{
        type:String,
        required:[true,'Required for authentication']
    },
    contactNumber:{
        type:Number,
        required:[true,'Contact number required']
    }
    
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);


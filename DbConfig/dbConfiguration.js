const mongoose = require('mongoose');

const connectDb = async function(){
    try{
        //console.log(process.env.CONNECTION_STRING);
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        //const connect = await mongoose.connect('mongodb://localhost:27017/turf-booking-DB')
        
        console.log(`Database connected ${connect.connection.host}, ${connect.connection.name}`)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
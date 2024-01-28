const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const connectDb = require('./DbConfig/dbConfiguration');
const userRouter = require('./User/userRounter');
const errorHandler = require('./middleware/errorHandler');
const gameRouter = require('./Game/gameRouter');
const chatRouter = require('./Chat/chatRouter');
const messageRouter = require('./Message/messageRouter')
dotenv.config();
connectDb();

app.use(cors());
const port = process.env.PORT || 5002;

app.use(express.json()); //middleware function used to parse JSON data sent to request body
app.use(cookieParser());

app.get('/', (req,res) => {
    res.json("TEST API");
})

app.use('/user',userRouter);
app.use('/game',gameRouter);
app.use('/chat',chatRouter);
app.use('/message',messageRouter);

app.use(errorHandler);


app.listen(port, () => {
    console.log("Server Listening at port", port);
})

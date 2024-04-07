const express = require('express');
const app = express();
const http = require('http').Server(app);

const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const connectDb = require('./DbConfig/dbConfiguration');
const userRouter = require('./User/userRounter');
const errorHandler = require('./middleware/errorHandler');
const gameRouter = require('./Game/gameRouter');
const chatRouter = require('./Chat/chatRouter');
const messageRouter = require('./Message/messageRouter');
const turfRouter = require('./Place/turfRouter');

const multerUploads = require('./middleware/multer').multerUploads;

const dataUri = require('./middleware/multer').dataUri;
const urlencoded = require('body-parser').urlencoded;
const json = require('body-parser').json;
const {resolve} = require('path');

const {cloudinaryConfig,uploader} = require('./config/cloudinaryConfig');
const gameRequestRouter = require('./GameRequest/gameRequestRouter');
//const uploader = require('./config/cloudinaryConfig').uploader;

dotenv.config();
connectDb();


const port = process.env.PORT || 5002;

app.use(express.static(resolve(__dirname,'src/public')))
app.use(urlencoded({extended:false}));

app.use(express.json()); //middleware function used to parse JSON data sent to request body
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
}));


app.get('/', (req,res) => {
    res.json("TEST API");

    //http.listen(5004);
})



app.use('/uploads',cloudinaryConfig);
//app.get('/uploads', (req,res) => res.sendFile(resolve(__dirname,'../public/index.html')));

app.post('/uploads', multerUploads.array('file',20), (req,res) => {
    console.log("Upload Api HIt ")
    console.log(req.files);

    if(req.files){
        
        //const file = dataUri(req).content;
        const uploadedFiles = []; 
        
        let photosUploaded = 0;
        let photosLen = req.files.length;

        for(let i = 0 ; i < req.files.length ; i++){
            
            const file = dataUri(req.files[i])
            uploader.upload(file, {
                resource_type: "auto",
                timeout:120000
            }).then((response) => {
                const image = response.url;

                uploadedFiles.push(image);
                photosUploaded++;

                if(photosUploaded === photosLen){

                    return res.status(200).json({
                        message:'file uploaded to cloudinary',
                        photos:uploadedFiles
                    })
                }
                

            }).catch((err) => {

                console.log("Error occured from this block")
                console.log(err)
                res.status(400).json({
                    data:{err}
                })
            })
        }

        
        // return cloudinary.uploader.upload(file, {
        //     resource_type: "auto",
          
        // });

        // if(req.file.mimetype === "video/mp4"){
        //     console.log("inside ")
        //     return uploader.upload(req.file,{
        //         resource_type:"video"
        //     }).then((response) => {
        //         const image = response.url;
    
        //         return res.status(200).json({
        //             message:'Image uploaded to cloudinary',
        //             data:{image}
        //         })
    
        //     }).catch((err) => {
    
        //         console.log(err)
        //         res.status(400).json({
        //             message:"Somthing went wrong",
        //             data:{err}
        //         })
        //     })
        // } else {
            
        //     return uploader.upload(file).then((response) => {
        //         const image = response.url;
    
        //         return res.status(200).json({
        //             message:'Image uploaded to cloudinary',
        //             data:{image}
        //         })
    
        //     }).catch((err) => {
    
        //         console.log(err)
        //         res.status(400).json({
        //             message:"Somthing went wrong",
        //             data:{err}
        //         })
        //     })

        // }

        
    }
})

app.use('/user',userRouter);
app.use('/game',gameRouter);
app.use('/chat',chatRouter);
app.use('/message',messageRouter);
app.use('/turf',turfRouter);
app.use('/gameRequest',gameRequestRouter);

app.use(errorHandler);

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected`);

    socket.on('joinChatRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('message', (message) => {
        
        console.log(message)
        if(message.type === "file"){
            console.log(message.body);
            console.log(message.mimeType)
        }

        socketIO.in(message.roomId).emit('messageResponse',message);
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
})


http.listen(port, () => {
    console.log("Server Listening at port", port);
})

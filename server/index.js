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
const multerUploads = require('./middleware/multer').multerUploads;

const dataUri = require('./middleware/multer').dataUri;
const urlencoded = require('body-parser').urlencoded;
const json = require('body-parser').json;
const {resolve} = require('path');

const {cloudinaryConfig,uploader} = require('./config/cloudinaryConfig');
//const uploader = require('./config/cloudinaryConfig').uploader;

dotenv.config();
connectDb();

app.use(cors());
const port = process.env.PORT || 5002;

app.use(express.static(resolve(__dirname,'src/public')))
app.use(urlencoded({extended:false}));

app.use(express.json({
    limit:'70mb'
})); //middleware function used to parse JSON data sent to request body
app.use(cookieParser());

app.get('/', (req,res) => {
    res.json("TEST API");
})

app.use('/uploads',cloudinaryConfig);
//app.get('/uploads', (req,res) => res.sendFile(resolve(__dirname,'../public/index.html')));

app.post('/uploads', multerUploads, (req,res) => {
    console.log("Upload Api HIt ")
    
   
    if(req.file){
        
        //const file = dataUri(req).content;
        const file = dataUri(req)
        return uploader.upload(file, {
            resource_type: "auto",
          
        }).then((response) => {
            const image = response.url;

            return res.status(200).json({
                message:'file uploaded to cloudinary',
                data:{image}
            })

        }).catch((err) => {

            console.log("Error occured from this block")
            console.log(err)
            res.status(400).json({
                message:"Somthing went wrong",
                data:{err}
            })
        })

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

app.use(errorHandler);


app.listen(port, () => {
    console.log("Server Listening at port", port);
})

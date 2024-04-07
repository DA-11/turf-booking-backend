// const multer = require('multer');
// const Datauri = require('datauri');
// const path = require('node:path');

// const storage = multer.memoryStorage();
// const multerUploads = multer({storage}).single('image');

// const dUri = new Datauri();

// const dataUri = req => {
//     dUri.format(path.extname(req.file.originalname).toString(),req.file.buffer);
// }


// module.exports = {multerUploads,dataUri};

const multer = require('multer');
const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();

//const Datauri = require('datauri');
const path = require('path');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage });
//const dUri = new Datauri();

//const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
const dataUri = file => {
    
    const b64 = Buffer.from(file.buffer).toString("base64");
    let file64 = "data:" + file.mimetype + ";base64," + b64;
    return file64;

    // const extName = path.extname(req.file.originalname).toString();
    // const file64 = parser.format(extName, req.file.buffer);
    

    // await runMiddleware(req, res, myUploadMiddleware);
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // const cldRes = await handleUpload(dataURI);
    // res.json(cldRes);
}
module.exports = { multerUploads, dataUri };
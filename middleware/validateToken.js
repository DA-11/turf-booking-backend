const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const validateToken = asyncHandler(async function(req,res,next){

    console.log(req.cookies.token);

    const {token} = req.cookies;

    if(!token){
        res.status(404);
        throw new Error("No user token found");
    }

    jwt.verify(
        token,
        jwtKey,
        {},
        async (err,user) => {
            if(err){
                res.status(400);
                throw new Error("Error occurred while validating token");
            }
            
            req.user = user;
            next();
            
        }
    )

});

module.exports = validateToken;
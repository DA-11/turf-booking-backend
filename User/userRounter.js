const express = require('express');
const userRouter = express.Router();
const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const getUserDetails = require('./getUserDetails');
const getAllUsers = require('./getAllUsers');
const getUserProfileFromToken = require('./getUserProfileFromToken');
const validateUser = require('../middleware/validateToken');
const logoutUser = require('./logout');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);

userRouter.route('/getUser').get(getUserDetails);
userRouter.route('/getAllUsers').get(getAllUsers);

userRouter.use(validateUser);
userRouter.route('/profile').get(getUserProfileFromToken);


module.exports= userRouter;
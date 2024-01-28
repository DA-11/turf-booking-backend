const express = require('express');
const userRouter = express.Router();
const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const getUserDetails = require('./getUserDetails');
const getAllUsers = require('./getAllUsers');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').get(loginUser);

userRouter.route('/getUser').get(getUserDetails);
userRouter.route('/getAllUsers').get(getAllUsers);

module.exports= userRouter;
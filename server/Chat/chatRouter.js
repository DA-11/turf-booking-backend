const express = require('express');
const chatRouter = express.Router();
const createChat = require('./createChat');

const getChatDetails = require('./getChat');
const validateToken = require('../middleware/validateToken');


//chatRouter.use(validateToken);
chatRouter.route('/create').post(createChat);
chatRouter.route('/getChat').get(getChatDetails);

module.exports = chatRouter;
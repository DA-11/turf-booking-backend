const express = require('express')
const messageRouter = express.Router()
const createMessage = require('./createMessage');
const validateToken = require('../middleware/validateToken');


//chatRouter.use(validateToken);
messageRouter.route('/create').post(createMessage);

module.exports = messageRouter;
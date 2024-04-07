const express = require('express');
const turfRouter = express.Router();
const validateUser = require('../middleware/validateToken');

const createTurf = require('./createTurf');
const getAllTurfs = require('./getAllTurfs');
const getTurfDetails = require('./getTurfDetailsByName');
const deleteTurf = require('./deleteTurf');
const updateTurf = require('./updateTurfDetails');
const getTurfDetailsWithContactNo = require('./getByContactNumber');
const getTurfDetailsById = require('./getTurfDetailsById');
const getTurfDetailsByName = require('./getTurfDetailsByName');

//turfRouter.use(validateUser);

turfRouter.route('/create').post(createTurf);
turfRouter.route('/getOneByName').get(getTurfDetailsByName);
turfRouter.route('/getOneById').get(getTurfDetailsById);
turfRouter.route('/getAll').get(getAllTurfs);
turfRouter.route('/getByContactNo').get(getTurfDetailsWithContactNo);

turfRouter.route('/update').put(updateTurf);
turfRouter.route('/delete').delete(deleteTurf);

module.exports = turfRouter;
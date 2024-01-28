const express = require('express');
const gameRouter = express.Router();
const validateToken = require('../middleware/validateToken');
const createGame = require("./createGame");
const getAllGames = require('./getAllGames');
const deleteGame = require('./deleteGame');
const getSingleGame = require('./getSingleGame');
const updateGame = require('./updateGame');

gameRouter.route('/getAllGames').get(getAllGames);

gameRouter.use(validateToken);
gameRouter.route('/createGame').post(createGame)
gameRouter.route('/deleteGame').delete(deleteGame);
gameRouter.route('/getSingleGame').get(getSingleGame);
gameRouter.route('/updateGame').put(updateGame);

module.exports = gameRouter;
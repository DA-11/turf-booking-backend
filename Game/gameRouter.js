const express = require('express');
const gameRouter = express.Router();
const validateToken = require('../middleware/validateToken');
const createGame = require("./createGame");
const getAllGames = require('./getAllGames');
const deleteGame = require('./deleteGame');
const getSingleGame = require('./getSingleGame');
const updateGame = require('./updateGame');
const getAllUserGames = require('./getAllUserGames');
const getGamesAfterCurrentTime = require('./getGamesAfterCurrentTime');
const getGameById = require('./getGameById');
const getAllRequestGames = require('./getAllRequestGames');

gameRouter.route('/getAllGames').get(getAllGames);

gameRouter.use(validateToken);

gameRouter.route('/createGame').post(createGame)
gameRouter.route('/getAllRequestGames').post(getAllRequestGames)

gameRouter.route('/deleteGame').delete(deleteGame);
gameRouter.route('/getSingleGame').get(getSingleGame);
gameRouter.route('/getGameAfterTime').get(getGamesAfterCurrentTime);
gameRouter.route('/getGamebyId').get(getGameById);
gameRouter.route('/updateGame').put(updateGame);
gameRouter.route('/getAllUserGames').get(getAllUserGames);

module.exports = gameRouter;
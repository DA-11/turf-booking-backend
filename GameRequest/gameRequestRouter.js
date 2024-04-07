const express = require('express');
const gameRequestRouter = express.Router();
const createGameRequest = require('./createGameRequest');
const getGameRequest = require('./getGameRequest');
const getAcceptedGameRequest = require('./getAcceptedGameRequest');

const validateToken = require('../middleware/validateToken');
const getGameRequestForHost = require('./getGameRequestForHost');
const approveGameRequest = require('./approveGameRequest');
const declineGameRequest = require('./declineGameRequest');
const getRequestingUserGames = require('./getRequestingUserGames');
const getHostingUserGames = require('./getHostingUserGames');

gameRequestRouter.use(validateToken);
gameRequestRouter.route('/createGameRequest').post(createGameRequest);
gameRequestRouter.route('/getAcceptedGameRequest').get(getAcceptedGameRequest);
gameRequestRouter.route('/getGameRequest').get(getGameRequest);
gameRequestRouter.route('/getGameRequestForHost').get(getGameRequestForHost);

gameRequestRouter.route('/approveRequest').put(approveGameRequest);
gameRequestRouter.route('/declineRequest').put(declineGameRequest);
gameRequestRouter.route('/getRequestingUserGames').get(getRequestingUserGames);
gameRequestRouter.route('/getHostingUserGames').get(getHostingUserGames);


module.exports = gameRequestRouter;
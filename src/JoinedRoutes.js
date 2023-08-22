const express = require('express');
const JoinedController = require('./controllers/Joined');
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');

const JoinedRouter = express.Router();
JoinedRouter.use(addModelsToRequest);

JoinedRouter.post('/joinEvent', JoinedController.create)
JoinedRouter.get('/showEvents/:id',JoinedController.show)//id = users id
JoinedRouter.delete('/deleteJoined/:id', JoinedController.deleteJoined )

module.exports = JoinedRouter;
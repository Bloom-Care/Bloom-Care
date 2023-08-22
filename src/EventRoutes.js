const express = require('express');
const EventController = require('./controllers/Events');
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');

const EventRouter = express.Router();
EventRouter.use(addModelsToRequest);

EventRouter.get('/listEvents', EventController.list )
EventRouter.get('/showEvent/:id', EventController.show)
EventRouter.post('/postEvent',EventController.post)
EventRouter.delete('/deleteEvents/:id',EventController.deleteEvent)

module.exports = EventRouter;
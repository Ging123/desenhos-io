import express from 'express';
const userController = require('./src/controllers/userController');
const roomController = require('./src/controllers/roomController');
const route = express.Router();

//ALL ROUTES THAT THIS API IS USING
route.use('/user', userController);
route.use('/room', roomController);

export default route;
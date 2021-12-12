import express from 'express';
const userController = require('./src/controllers/userController');
const route = express.Router();

//ALL ROUTES THAT THIS API IS USING
route.use('/user', userController);

export default route;
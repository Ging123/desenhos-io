import { verifyIfIsAnInternalException } from '../util/exception';
import InsertUseCase from '../use_cases/room/insertUseCase';
import { authAccessToken } from '../middlewares/authJwt';
import express from 'express';

const route = express.Router();

//ROUTE TO INSERT A NEW GROUP
route.post('/', authAccessToken, async (req:any, res) => {
  try {
    const userThatAreCreatingTheRoom = req.user;
    const room = new InsertUseCase();
    await room.insert(userThatAreCreatingTheRoom);
    res.status(201).send();
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

module.exports = route;
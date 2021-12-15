import { verifyIfIsAnInternalException } from '../util/exception';
import { authAccessToken } from '../middlewares/authJwt';
import GetUseCase from '../use_cases/room/getUseCase';
import express from 'express';

const route = express.Router();

//ROUTE TO JOIN TO A ROOM
route.get('/', authAccessToken, async (req:any, res) => {
  try {
    const room = new GetUseCase();
    await room.get().then((roomData) => {
      res.status(201).json(roomData);
    });
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

module.exports = route;
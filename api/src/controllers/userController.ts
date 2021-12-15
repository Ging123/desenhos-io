import SendSecretCodeUseCase from '../use_cases/user/sendSecretCodeUseCase';
import { authAccessToken, authRefreshToken } from '../middlewares/authJwt';
import ConfirmEmailUseCase from '../use_cases/user/confirmEmailUseCase';
import UpdateTokensUseCase from '../use_cases/user/updateTokensUseCase';
import { verifyIfIsAnInternalException } from '../util/exception';
import LogoutUseCase from '../use_cases/user/logoutUseCase';
import LoginUseCase from '../use_cases/user/loginUseCase';
import SaveUseCase from '../use_cases/user/saveUseCase';
import express from 'express';

const route = express.Router();

//ROUTE TO INSERT AN USER
route.post('/', async (req, res) => {
  try {
    const user = new SaveUseCase();
    await user.save({
      email:req.body.email,
      username:req.body.username,
      password:req.body.password
    })
    res.status(201).send();
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//ROUTE TO CONFIRM USER EMAIL
route.get('/confirm', async (req:any, res) => {
  try {
    const user = new ConfirmEmailUseCase();
    await user.confirmEmail(req.query.email, req.query.code)
    res.status(204).send()
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//ROUTE TO CREATE A NEW SECRET CODE TO CONFIRM EMAIL
route.post('/newConfirmCode', async (req, res) => {
  try {
    const user = new SendSecretCodeUseCase();
    await user.sendSecretCodeToConfirmEmail(req.body.email)
    res.status(201).json();
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//ROUTE TO LOGIN
route.post('/login', async (req, res) => {
  try {
    const user = new LoginUseCase()
    await user.login(req.body.emailOrUsername, req.body.password)
    .then((tokens) => res.status(201).json(tokens));
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//GET NEW ACCESS AND REFRESH TOKEN 
route.post('/newTokens', authRefreshToken, async (req:any, res) => {
  try {
    const user = new UpdateTokensUseCase();
    await user.updateTokens(req.user, req.refreshToken)
    .then((tokens) => res.status(201).json(tokens))
  }
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//LOGOUT USER
route.delete('/logout', authRefreshToken, async (req:any, res) => {
  try {
    const user = new LogoutUseCase();
    await user.logout(req.user);
    res.status(204).send();
  } 
  catch(err:any) {
    err = verifyIfIsAnInternalException(err);
    res.status(err.status).json(err.message);
  }
});

//GET DATA OF THE USER
route.get('/', authAccessToken, async (req:any, res) => {
  const user = req.user;
  const userData = {
    email:user.email,
    username:user.username
  }
  res.status(200).json(userData);
});

module.exports = route;
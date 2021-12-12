import { NextFunction, Response } from 'express';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userModel = new UserModel();

export function authAccessToken(req:any, res:Response, next:NextFunction) {
  const token = req.headers["authorization"];
  if(!token) return res.status(401).json('Token de acesso não foi enviado');
  jwt.verify(token, process.env.SECRET_KEY_OF_ACCESS_TOKEN!, 
  async (err:unknown, user:any) => {
    if(err) return res.status(403).json('Seu token de acesso expirou');
    await userModel.findOneById(user.id).then((userFound:any) => {
      if(!userFound.refreshToken) return res.status(401).json('Token inválido');
      req.user = user;
      next();
    });
  });
}

export function authRefreshToken(req:any, res:Response, next:NextFunction) {
  const token = req.body.refreshToken;
  if(!token) return res.status(401).json('Refresh token não foi enviado');
  jwt.verify(token, process.env.SECRET_KEY_OF_REFRESH_TOKEN!, 
  async (err:unknown, user:any) => {
    if(err) return res.status(403).json('Token inválido');
    await userModel.findOneById(user.id).then(async (userFound:any) => {
      if(!userFound.refreshToken) return res.status(401).json('Token inválido');
      await bcrypt.compare(token, userFound.refreshToken).then((match) => {
        if(!match) return res.status(401).json('Token inválido');
        req.user = user;
        next();
      });
    });
  });
}
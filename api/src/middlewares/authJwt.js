"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRefreshToken = exports.authAccessToken = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel = new userModel_1.default();
function authAccessToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(400).json('Token de acesso não foi enviado');
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_OF_ACCESS_TOKEN, (err, user) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(403).json('Seu token de acesso expirou');
        yield userModel.findOneById(user.id).then((userFound) => {
            if (!userFound.refreshToken)
                return res.status(401).json('Usuario offline');
            req.user = userFound;
            next();
        });
    }));
}
exports.authAccessToken = authAccessToken;
function authRefreshToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(400).json('Refresh token não foi enviado');
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_OF_REFRESH_TOKEN, (err, user) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(403).json('Token inválido');
        yield userModel.findOneById(user.id).then((userFound) => __awaiter(this, void 0, void 0, function* () {
            if (!userFound.refreshToken)
                return res.status(401).json('Usuario offline');
            yield bcrypt_1.default.compare(token, userFound.refreshToken).then((match) => {
                if (!match)
                    return res.status(403).json('Token inválido');
                req.user = userFound;
                req.refreshToken = token;
                next();
            });
        }));
    }));
}
exports.authRefreshToken = authRefreshToken;

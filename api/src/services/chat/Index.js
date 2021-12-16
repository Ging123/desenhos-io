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
const AddNewUserToChatUseCase_1 = __importDefault(require("../../use_cases/room/AddNewUserToChatUseCase"));
const RemoveAnUserUseCase_1 = __importDefault(require("../../use_cases/room/RemoveAnUserUseCase"));
module.exports = function (io) {
    io.sockets.on('connection', (socket => {
        var username;
        var roomId;
        socket.on('join_to_chat', (data) => __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return;
            const room = new AddNewUserToChatUseCase_1.default();
            socket.join(data.roomId);
            socket.broadcast.to(data.roomId).
                emit("site-message", `${data.username} entrou na sala`);
            username = data.username;
            roomId = data.roomId;
            yield room.addNewUserToChat(data.roomId);
        }));
        socket.on('send_message', (message) => {
            if (!message)
                return;
            socket.broadcast.to(roomId).
                emit("message", `${username}: ${message}`);
        });
        socket.on("disconnect", () => __awaiter(this, void 0, void 0, function* () {
            if (username) {
                const room = new RemoveAnUserUseCase_1.default();
                socket.broadcast.to(roomId).
                    emit("site-message", `${username} saiu da sala`);
                yield room.removeAnUser(roomId);
            }
        }));
    }));
};

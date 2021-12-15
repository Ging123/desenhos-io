import AddNewUserToChatUseCase from "../../use_cases/room/AddNewUserToChatUseCase";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import RemoveAnUserUseCase from "../../use_cases/room/RemoveAnUserUseCase";

type socket = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 


module.exports = function(io:socket) {
  io.sockets.on('connection', (socket => {

    var username:string;
    var roomId:any;

    socket.on('join_to_chat', async (data:any) => {
      if(!data) return;
      const room = new AddNewUserToChatUseCase();
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).
      emit("site-message", `${data.username} entrou na sala`);
      username = data.username;
      roomId = data.roomId;
      await room.addNewUserToChat(data.roomId);
    });

    socket.on('send_message', (message:string) => {
      if(!message) return;
      socket.broadcast.to(roomId).
      emit("message", `${username}: ${message}`);
    });

    socket.on("disconnect", async () => {
      if(username) {
      const room = new RemoveAnUserUseCase();
      socket.broadcast.to(roomId).
      emit("site-message", `${username} saiu da sala`);
      await room.removeAnUser(roomId);
      }
    });
  }));
}
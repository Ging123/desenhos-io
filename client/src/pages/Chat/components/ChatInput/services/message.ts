import createMessage from "../../ChatWithMessages/services/createMessage";
import { Socket } from "socket.io-client";

export default class Message {

  private socket:Socket;
  
  constructor(socket:Socket) {
    this.socket = socket;
  }

  public send(message:string) {
    createMessage(`Eu: ${message}`);
    this.socket.emit("send_message", message);
  }
}
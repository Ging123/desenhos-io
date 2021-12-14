import RoomModel from "../../models/roomModel";
import exception from "../../util/exception";


export default class InsertUseCase {

  private readonly room = new RoomModel();

  public async insert(user:any) {
    const userCantCreateARoom = 'Você não pode criar uma sala enquanto está em uma';
    if(user.currentRoom) throw exception(userCantCreateARoom, 403);
    await this.room.create(user);
  } 
}
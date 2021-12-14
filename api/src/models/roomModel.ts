import RoomCollection from "../database/roomCollection";
import UserModel from "./userModel";

export default class RoomModel extends RoomCollection {

  private readonly user = new UserModel();

  public async create(userThatCreated:any) {
    const room = this.createANewRoom();
    await this.insert(room)
    .then(async (roomSaved:any) => {
      await this.user.addRoom(userThatCreated, roomSaved.id);
    });
  }
}
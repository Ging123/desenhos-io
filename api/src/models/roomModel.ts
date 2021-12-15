import RoomCollection from "../database/roomCollection";

export default class RoomModel extends RoomCollection {

  public async create() {
    const room = this.createANewRoom();
    return await this.insert(room);
  }

  public async addANewUser(room:any) {
    room.players_inside += 1;
    await room.save();
  }

  public async removeAUser(room:any) {
    room.players_inside -= 1;
    await room.save();
  }
}
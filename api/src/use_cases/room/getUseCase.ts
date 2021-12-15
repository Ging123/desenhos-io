import Base from "./base";

export default class GetUseCase extends Base {

  public async get() {
    let room:any;
    await this.room.findOneFreeRoom()
    .then(async (roomFound:any) => {
      if(roomFound) return room = roomFound;
      await this.room.create()
      .then((createdRoom) => room = createdRoom);
    });
    return room;
  }
}
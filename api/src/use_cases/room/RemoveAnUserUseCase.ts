import exception from "../../util/exception";
import Base from "./base";

export default class RemoveAnUserUseCase extends Base {

  public async removeAnUser(roomId:string) {
    await this.room.findOneById(roomId)
    .then(async(room) => {
      if(!room) throw exception("Sala não encontrada");
      this.room.removeAUser(room);
    });
  }
}
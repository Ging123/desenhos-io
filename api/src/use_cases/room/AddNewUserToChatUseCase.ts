import exception from "../../util/exception";
import Base from "./base";

export default class AddNewUserToChatUseCase extends Base {

  public async addNewUserToChat(roomId:any) {
    await this.room.findOneById(roomId)
    .then(async(room) => {
      if(!room) throw exception("Sala não encontrada");
      this.room.addANewUser(room);
    });
  }
}
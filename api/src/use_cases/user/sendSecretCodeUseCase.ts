import exception from "../../util/exception";
import Base from "./base";

export default class SendSecretCodeUseCase extends Base {

  public async sendSecretCodeToConfirmEmail(email:string, testing=false) {
    await this.verifyIfEmailAlredyIsConfirmed(email);
    return await this.user.sendSecretCodeToConfirmEmail(email, testing);
  }

  private async verifyIfEmailAlredyIsConfirmed(email:string) {
    await this.user.findOneByEmail(email)
    .then((user:any) => {
      if(!user) throw exception('Esse email não existe no sistema', 403);
      if(user.confirmed) throw exception('Esse email já foi confirmado', 403)
    });
  }
}
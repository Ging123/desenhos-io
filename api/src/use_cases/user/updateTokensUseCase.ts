import exception from "../../util/exception";
import bcrypt from 'bcrypt';
import Base from "./base";

export default class UpdateTokensUseCase extends Base {
  
  public async updateTokens(email:string, refreshToken:string) {
    let user:any;
    await this.getByEmailAndValidate(email)
    .then(async (userFound:any) => {
      user = userFound;
      await this.verifyIfTokenIsValid(user.refreshToken, refreshToken);
    });
    return await this.user.updateTokens(user);
  }

  private async getByEmailAndValidate(email:string) {
    let user:any;
    await this.user.findOneByEmail(email).then((userFound) => {
      if(!userFound) throw exception('Token inválido', 401);
      user = userFound;
    });
    return user;
  }

  private async verifyIfTokenIsValid(hashedToken:string, textToken:string) {
    textToken += process.env.SALT_SECRET!;
    await bcrypt.compare(textToken, hashedToken).then((match) => {
      if(!match) throw exception('Token inválido', 401);
    });
  }
}
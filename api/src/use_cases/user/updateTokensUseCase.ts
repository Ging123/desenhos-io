import exception from "../../util/exception";
import bcrypt from 'bcrypt';
import Base from "./base";

export default class UpdateTokensUseCase extends Base {
  
  public async updateTokens(user:any, refreshToken:string) {
    console.log(user)
    console.log(refreshToken)
    await this.verifyIfTokenIsValid(user.refreshToken, refreshToken);
    return await this.user.updateTokens(user);
  }

  private async verifyIfTokenIsValid(hashedToken:string, textToken:string) {
    textToken += process.env.SALT_SECRET!;
    await bcrypt.compare(textToken, hashedToken).then((match) => {
      if(!match) throw exception('Token inválido', 401);
    });
  }
}
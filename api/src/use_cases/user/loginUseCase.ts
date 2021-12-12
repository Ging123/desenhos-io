import exception from "../../util/exception";
import bcrypt from 'bcrypt';
import Base from "./base";

export default class LoginUseCase extends Base {

  public async login(emailOrUsername:string, password:string) {
    let userFound:any
    await this.user.findOneByEmailOrUsername(emailOrUsername)
    .then(async (user:any) => {
      await this.validateUserFoundToLogin(user, password);
       userFound = user;
    });
    return await this.user.login(userFound);
  }

  private async validateUserFoundToLogin(userFound:any, passwordTyped:string) {
    if(!userFound) throw exception('Esse email ou username não está registrado no sistema', 400);
    await this.verifyIfPasswordsMatch(passwordTyped, userFound.password);
    if(userFound.refreshToken) throw exception('Você já está logado', 405);
    if(!userFound.confirmed) throw exception('Para logar, seu email deve ser confirmado primeiro', 401);
  }

  private async verifyIfPasswordsMatch(password:string, encryptPassword:string) {
    password += process.env.SALT_SECRET!;
    await bcrypt.compare(password, encryptPassword).then((match) => {
      if(!match) throw exception('Senha digitada errada');
    });
  }
}
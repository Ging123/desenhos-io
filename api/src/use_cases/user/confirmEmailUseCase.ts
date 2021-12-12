import Base from "./base";

export default class ConfirmEmailUseCase extends Base {
  
  public async confirmEmail(email:string, code:string) {
    await this.secret.verifyIfCodeAndEmailAreValid(email, code);
    await this.user.confirmEmail(email);
  }
}
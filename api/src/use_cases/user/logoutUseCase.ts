import Base from "./base";

export default class LogoutUseCase extends Base {
  
  public async logout(user:any) {
    await this.user.logout(user);
  }
}
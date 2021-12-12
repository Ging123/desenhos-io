import Base from "./base";

export default class LogoutUseCase extends Base {
  
  public async logout(email:string) {
    await this.user.findOneByEmail(email)
    .then(async (user:any) => {
      await this.user.logout(user);
    });
  }
}
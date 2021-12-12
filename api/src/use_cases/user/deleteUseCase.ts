import Base from "./base";

export default class DeleteUseCase extends Base {

  public async delete(email:string) {
    return await this.user.delete(email)
  }
}
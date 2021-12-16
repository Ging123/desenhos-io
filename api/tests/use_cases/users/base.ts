import DeleteUseCase from '../../../src/use_cases/user/deleteUseCase';
import SaveUseCase from '../../../src/use_cases/user/saveUseCase';
import SecretModel from '../../../src/models/secretModel';
import UserModel from '../../../src/models/userModel';
import LoginUseCase from '../../../src/use_cases/user/loginUseCase';

const user = new UserModel();
const userSave = new SaveUseCase();
const userDelete = new DeleteUseCase();
const userLogin = new LoginUseCase();
const secret = new SecretModel();

export default class Base {

  public async create(username:string, email:string, password:string) {
    await userSave.save({
      username:username, 
      email:email, 
      password:password
    }, true);
  }

  public async findSecret(email:string) {
    return await secret.getCode(email);
  }

  public async delete(email:string) {
    await userDelete.delete(email);
  }

  public async confirmEmail(email:string) {
    await user.confirmEmail(email);
  }

  public async findByEmail(email:string) {
    return await user.findOneByEmail(email);
  }

  public async login(emailOrUsername:string, password:string) {
    return await userLogin.login(emailOrUsername, password);
  }
}
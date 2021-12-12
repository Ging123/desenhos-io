import SecretModel from '../../models/secretModel';
import UserModel from '../../models/userModel';
import EmailUtil from '../../util/emailUtil';

export default class Base {

  protected readonly emailUtil = new EmailUtil();
  protected readonly user = new UserModel();
  protected readonly secret = new SecretModel();

}
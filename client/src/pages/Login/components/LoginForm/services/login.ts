import Validator from "../../../../../global/services/validator";
import Token from "../../../../../global/services/tokens";
import config from '../../../../../config';
import axios from "axios";

export default class Request {

  private emailOrUsername:string;
  private password:string;
  private readonly validate = new Validator();
  private readonly token = new Token();

  constructor(emailOrUsername:string, password:string) {
    this.emailOrUsername = emailOrUsername;
    this.password = password;
    this.validateForLogin();
  }

  public async login() {
    const url = `${config.API_URL}user/login`;
    const data = {
      emailOrUsername:this.emailOrUsername,
      password:this.password
    }
    await axios.post(url, data)
    .then((result) => this.token.save(result.data))
    .catch((err) => {
      const error = JSON.parse(err.request.response);
      throw error;
    });
  }

  private validateForLogin() {
    this.validate.password(this.password);
  }
}
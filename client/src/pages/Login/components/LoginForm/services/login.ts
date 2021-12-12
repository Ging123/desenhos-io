import Validator from "../../../../../global/services/validator";
import config from '../../../../../config';
import axios from "axios";

export default class Request {

  private emailOrUsername:string;
  private password:string;
  private readonly validate = new Validator();

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
    .then((result) => this.saveTokens(result.data))
    .catch((err) => {
      const error = JSON.parse(err.request.response);
      throw error;
    });
  }

  private validateForLogin() {
    this.validate.password(this.password);
  }

  private saveTokens(tokens:object) {
    const tokensString = JSON.stringify(tokens);
    localStorage.setItem('tokens', tokensString);
  }
}
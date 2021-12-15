import Validator from "../../../../../global/services/validator";
import getUser from "../../../../../global/services/getUser";
import Token from "../../../../../global/services/tokens";
import { NavigateFunction } from "react-router-dom";
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

  public async login(navigate:NavigateFunction) {
    const url = `${config.API_URL}user/login`;
    const data = {
      emailOrUsername:this.emailOrUsername,
      password:this.password
    }
    await axios.post(url, data)
    .then(async (result) => {
      this.token.save(result.data)
      await getUser(navigate);
    })
    .catch((err) => {
      const error = JSON.parse(err.request.response);
      throw error;
    });
  }

  private validateForLogin() {
    this.validate.password(this.password);
  }
}
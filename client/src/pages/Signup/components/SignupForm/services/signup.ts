import Validator from "../../../../../global/services/validator";
import config from '../../../../../config';
import axios from "axios";

export default class Request {

  private email:string;
  private username:string;
  private password:string;
  private readonly validate = new Validator();

  constructor(email:string, username:string, password:string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.validateForSignup();
  }

  public async signup() {
    const url = `${config.API_URL}user/`;
    const data = {
      email:this.email,
      username:this.username,
      password:this.password
    }
    await axios.post(url, data)
    .catch((err) => {
      const error = JSON.parse(err.request.response);
      throw error;
    });
  }

  private validateForSignup() {
    this.validate.email(this.email);
    this.validate.password(this.password, false);
  }
}
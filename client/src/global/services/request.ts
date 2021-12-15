import config from '../../config';
import axios from 'axios';
import Token from './tokens';


export default class Request {

  private tokens = new Token();

  public get(url:string, params?:object, headers?:any) {
    return new Promise(async (sucess, reject) => {
      await axios.get(url, {params:params, headers:headers})
      .then((response) => {sucess(response.data)})
      .catch((err) => reject(err.request));
    });
  }

  public post(url:string, data?:object, headers?:any) {
    return new Promise(async (sucess, reject) => {
      await axios.post(url, data, {headers:headers})
      .then((response) => sucess(response.data))
      .catch((err) => reject(err.request));
    });
  }

  public delete(url:string, params?:object, headers?:any) {
    return new Promise(async (sucess, reject) => {
      await axios.delete(url, {params:params, headers:headers})
      .then((response) => sucess(response.data))
      .catch((err) => reject(err.request));
    });
  }

  public async updateTokens(refreshToken:string) {
    return new Promise(async (sucess, reject) => {
      const url = `${config.API_URL}user/newTokens`;
      await axios.post(url, {}, {headers:{'Authorization':refreshToken}})
      .then((response) => {
        const tokens = this.tokens.save(response.data);
        sucess(tokens);
      })
      .catch((err) => reject(err.request));
    });
  }
}
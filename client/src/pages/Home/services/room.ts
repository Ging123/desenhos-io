import Request from '../../../global/services/request';
import Token from '../../../global/services/tokens';
import { NavigateFunction } from 'react-router-dom';
import config from '../../../config';

const req = new Request();
const token = new Token();

export default class Room {

  private navigate:NavigateFunction;

  constructor(navigate:NavigateFunction) {
    this.navigate = navigate;
  }

  public async join() {
    await this.findRoom()
    .then((room) => {
      this.save(room);
      this.navigate('/chat');
    })
    .catch(async (err) => await this.validateError(err));
  }

  private async findRoom() {
    const tokens = token.get();
    if(!tokens) return this.navigate('/');
    const url = `${config.API_URL}room/`;
    return await req.get(url, {}, {"Authorization":tokens.accessToken})
  }


  private async validateError(err:any) {
    const tokenExpired = err.status === 403;
    const userLogout = err.status === 401;
    const goBackToLoginPage = () => this.navigate('/');
    if(tokenExpired) return await this.getNewTokens();
    if(userLogout) return goBackToLoginPage();
    alert("Você não pode criar uma sala enquanto estiver jogando em uma");
  }


  private async getNewTokens() {
    const tokens = token.get();
    await req.updateTokens(tokens.refreshToken)
    .then(async () => await this.join())
    .catch((err:any) => {
      if(err.status === 401) this.navigate('/');
    });
  }

  private save(room:any) {
    const roomstr = JSON.stringify(room);
    localStorage.removeItem("room");
    localStorage.setItem("room", roomstr);
  }
}
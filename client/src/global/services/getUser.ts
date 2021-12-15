import { NavigateFunction } from 'react-router-dom';
import config from '../../config';
import Request from './request';
import Token from './tokens';
import User from './user';

interface user {
  email?:string;
  username?:string;
}

const req = new Request();
const token = new Token();
const user = new User();

export default async function getUser(navigate:NavigateFunction) {
  const tokens = token.get();
  const url = `${config.API_URL}user`;
  await req.get(url, {}, {"Authorization":tokens.accessToken})
  .then((userData:any) => user.save(userData))
  .catch(async (err) => await validateError(err, navigate));
}

async function validateError(err:any, navigate:NavigateFunction) {
  const userIsNotLogged = err.status === 401;
  const tokenExpired = err.status === 403;
  if(tokenExpired) return await getNewTokens(navigate);
  if(userIsNotLogged) navigate('/');
}

async function getNewTokens(navigate:NavigateFunction) {
  const tokens = token.get();
  await req.updateTokens(tokens.refreshToken)
  .then(async () => await getUser(navigate))
  .catch((err:any) => navigate('/'));
}

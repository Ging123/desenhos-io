import Request from '../../../global/services/request';
import { NavigateFunction } from 'react-router-dom';
import Token from '../../../global/services/tokens';
import config from '../../../config';

interface user {
  email?:string;
  username?:string;
}

type navigate = NavigateFunction;
type setter = React.Dispatch<React.SetStateAction<user | undefined>>

const req = new Request();
const token = new Token();

export default async function getUser(setUser:setter, navigate:navigate) {
  const tokens = token.get();
  if(!tokens) return navigate('/');
  const url = `${config.API_URL}user`;
  await req.get(url, {}, {"Authorization":tokens.accessToken})
  .then((userData:any) => setUser(userData))
  .catch(async (err) => await validateError(err, setUser, navigate));
}

async function validateError(err:any, setUser:setter, navigate:navigate) {
  const userIsNotLogged = err.status === 401;
  const tokenExpired = err.status === 403;
  const goBackToLoginPage = () => navigate('/');
  if(userIsNotLogged) return goBackToLoginPage();
  if(tokenExpired) return await getNewTokens(setUser, navigate);
}

async function getNewTokens(setUser:setter, navigate:navigate) {
  const tokens = token.get();
  await req.updateTokens(tokens.refreshToken)
  .then(async () => await getUser(setUser, navigate))
  .catch((err:any) => {
    if(err.status === 401) navigate('/');
  });
}

import Request from "../../../global/services/request";
import { NavigateFunction } from "react-router-dom";
import Token from "../../../global/services/tokens";
import config from "../../../config";

const req = new Request();
const token = new Token();

export default async function logout(navigate:NavigateFunction) {
  const url = `${config.API_URL}user/logout`;
  const tokens = token.get();
  await req.delete(url, {}, {"Authorization":tokens.refreshToken});
  token.delete();
  localStorage.removeItem("user");
  localStorage.removeItem("room");
  navigate('/');
}
import jwt from 'jsonwebtoken';

interface tokens {
  refreshToken:string;
  accessToken:string;
}

export default class Token {

  private accessTokenTime:string;

  constructor(accessTokenTime:string) {
    this.accessTokenTime = accessTokenTime;
  }

  //METHODS TO CREATE NEW REFESH AND ACCESS TOKENS 
  public async create(user:any) {
    const tokens = this.createJwtTokens({
      id:user.id,
      email:user.email,
      username:user.username
    });
    return this.refreshTokenAndAccessToken(tokens);
  }

  private createJwtTokens(userData:any):tokens {
    return {
      accessToken:jwt.sign(userData, process.env.SECRET_KEY_OF_ACCESS_TOKEN!, 
      {expiresIn:this.accessTokenTime}),
      refreshToken:jwt.sign(userData, process.env.SECRET_KEY_OF_REFRESH_TOKEN!)
    }
  }

  //UTIL
  private refreshTokenAndAccessToken(tokens:any) {
    return {
      refreshToken:tokens.refreshToken,
      accessToken:tokens.accessToken
    }
  }
}
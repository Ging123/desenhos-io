import bcrypt from 'bcrypt';

export default class Encrypt {

  public async password(user:any) {
    await bcrypt.hash(user.password + process.env.SALT_SECRET!, 10)
    .then((encryptPassword:string) => user.password = encryptPassword);
  }

  public refreshToken(refreshToken:string) {
    return new Promise(async (sucess) => {
      await bcrypt.hash(refreshToken + process.env.SALT_SECRET!, 10)
      .then((encryptRefreshToken:string) => sucess(encryptRefreshToken));
    });
  }
}
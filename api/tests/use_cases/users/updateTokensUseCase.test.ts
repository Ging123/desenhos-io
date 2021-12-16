import UpdateTokensUseCase from '../../../src/use_cases/user/updateTokensUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new UpdateTokensUseCase();
const email = "UpdateTokensUseCase@outlook.com";
const username = 'UpdateTokensUseCase';
var userData:any;
var refreshToken:string;

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test('Test: Update tokens with an invalid token', async () => {
  try {
    await user.create(username, email, 'password');
    await user.confirmEmail(email);
    await user.login(username, 'password').then((tokens:any) => {
      refreshToken = tokens.refreshToken;
    })
    await user.findByEmail(email).then(async (userFound) => {
      userData = userFound;
      await useCase.updateTokens(userFound, 'umrefreshtokeninválidokk');
    });
  }
  catch(err:any) {
    const invalidToken = 'Token inválido';
    expect(err.message).toBe(invalidToken);
  }
}, 10000);

test('Test: Update tokens', async () => {
  await useCase.updateTokens(userData, refreshToken)
  .then(() => expect(true).toBe(true));
});

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
import ConfirmEmailUseCase from '../../../src/use_cases/user/confirmEmailUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new ConfirmEmailUseCase();
const email = "ConfirmEmailUseCase@outlook.com";
var secretCode:string;

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test("Test: Confirm an user with a invalid code", async () => {
  try {
    await user.create("test2", email, "123456789");
    await useCase.confirmEmail(email, "invalid code kk");
  }
  catch(err:any) {
    const invalidCode = 'Código de verificação incorreto';
    expect(err.message).toBe(invalidCode);
  }
});

test("Test: Confirm an user", async () => {
  await user.findSecret(email)
  .then(async (secret:any) => {
    secretCode = secret;
    await useCase.confirmEmail(email, secret)
    .then(() => expect(true).toBe(true));
  });
});

test('Test: Confirm an user that is alredy confirmed', async () => {
  try {
    await useCase.confirmEmail(email, secretCode)
  }
  catch(err:any) {
    const invalidSecretCode = 'Codigo de verificação inválido';
    expect(err.message).toBe(invalidSecretCode);
  }
});

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
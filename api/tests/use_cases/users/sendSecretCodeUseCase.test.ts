import SendSecretCodeUseCase from '../../../src/use_cases/user/sendSecretCodeUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new SendSecretCodeUseCase();
const email = "SendSecretCodeUseCase@outlook.com";
const username = 'SendSecretCodeUseCase';

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test("Test: Send a secret code to an email that doesn't exists", async () => {
  try {
    await useCase.sendSecretCodeToConfirmEmail('SendSecretCodeUseCase2@outlook.com', true);
  } 
  catch(err:any) {
    const emailDoesntExists = 'Esse email não existe no sistema';
    expect(err.message).toBe(emailDoesntExists);
  }
});

test('Test: Send a secret code', async () => {
  await user.create(username, email, '123456789');
  await useCase.sendSecretCodeToConfirmEmail(email, true)
  .then(() => {
    expect(true).toBe(true);
  });
});

test('Test: Send a secrete code to an user that is alredy confirmed', async () => {
  try {
    await user.confirmEmail(email);
    await useCase.sendSecretCodeToConfirmEmail(email, true);
  } 
  catch(err:any) {
    const emailAlredyConfirmed = 'Esse email já foi confirmado';
    expect(err.message).toBe(emailAlredyConfirmed);
  }
});

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
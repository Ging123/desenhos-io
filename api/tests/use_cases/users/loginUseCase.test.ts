import LoginUseCase from '../../../src/use_cases/user/loginUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new LoginUseCase();
const email = 'LoginUseCase@outlook.com';
const username = 'LoginUseCase';
const password = '123456789';

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test("Test: Login with an user that doesn't exists", async () => {
  try {
    await useCase.login("emailquenexiste@gmail.com", "123456789");
  } 
  catch(err:any) {
    const userDoesntExists = "Esse email ou username não está registrado no sistema";
    expect(err.message).toBe(userDoesntExists);
  }
});

test("Test: Login with an user that has not a confimed email", async () => {
  try {
    await user.create(username, email, password);
    await useCase.login(username, password);
  } 
  catch(err:any) {
    const emailWasntConfirmed = 'Para logar, seu email deve ser confirmado primeiro';
    expect(err.message).toBe(emailWasntConfirmed);
  }
});

test('Test: Login with a wrong password', async () => {
  try {
    await user.confirmEmail(email);
    await useCase.login(username, 'uma senha errada qualquer lol');
  }
  catch(err:any) {
    const passwordWrong = 'Senha digitada errada';
    expect(err.message).toBe(passwordWrong);
  }
});

test('Test: Login an user', async () => {
  await useCase.login(email, password).then((tokens) => {
    expect(tokens).toBeDefined();
  });
});

test('Test: Login with an account that is logged', async () => {
  try {
    await useCase.login(username, password);
  }
  catch(err:any) {
    const userAlredyIsLogged = 'Você já está logado';
    expect(err.message).toBe(userAlredyIsLogged);
  }
});

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
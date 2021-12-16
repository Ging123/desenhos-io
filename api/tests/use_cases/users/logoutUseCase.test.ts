import LogoutUseCase from '../../../src/use_cases/user/logoutUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new LogoutUseCase();
const email = "LogoutUseCase@gmail.com";

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
  
});

test('Test: Logout an user', async () => {
  await user.create('LogoutUseCase', email, '123456789');
  await user.confirmEmail(email);
  await user.login(email, '123456789');
  await user.findByEmail(email).then(async (user) => {
    await useCase.logout(user);
  });
}, 10000);

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
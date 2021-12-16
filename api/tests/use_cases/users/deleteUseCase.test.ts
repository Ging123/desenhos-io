import DeleteUseCase from '../../../src/use_cases/user/deleteUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test("Test: Delete an user", async () => {
  const email = "teste@outlook.com";
  await user.create("teste", email, "123456789");
  const useCase = new DeleteUseCase();
  await useCase.delete(email).then(() => expect(true).toBe(true))
});

afterAll(async () => {
  await mongose.disconnect();
});
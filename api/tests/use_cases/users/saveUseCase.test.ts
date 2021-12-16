import SaveUseCase from '../../../src/use_cases/user/saveUseCase';
import mongose from 'mongoose';
import Base from './base';

const user = new Base();
const useCase = new SaveUseCase();
const email = "SaveUseCase@outlook.com";
const username = 'SaveUseCase';

beforeAll(async () => {
  await mongose.connect(process.env.DB_URL_TEST!);
});

test('Test: Create a user withouth password', async () => {
  try {
    await useCase.save({
      username:username,
      email:email,
      password:''
    });
  }
  catch(err:any) {
    const passwordEmpty = 'Campo de senha não foi preenchido';
    expect(err.message).toBe(passwordEmpty);
  }
});

test('Test: Test a password with length greater than max allowed', async () => {
  try {
    await useCase.save({
      email:email,
      username:username,
      password:'ksadsaijsaifjsaifjsaifjsaijfisajfisajfisajfaskfoaskfosakfosakfoaksfoaksofkasofkasofkasofkasofkasfoaskfoksafokasfoaskfoaskfoaskfoaskfoaskfoaskfoaskfoaspasfasfkoaskfoasfk021kf021kf21okfokf12ofko21kfok21fo'
    });
  }
  catch(err:any) {
    const passwordGreaterThenAllowed = 'A senha pode ter no máximo 30 caracteries';
    expect(err.message).toBe(passwordGreaterThenAllowed);
  }
});

test('Test: create an user with a password shorter than allowed', async () => {
  try {
    await useCase.save({
      username:username,
      email:email,
      password:'1'
    });
  }
  catch(err:any) {
    const passwordShorterThanAllowed = 'A senha deve ter no mínimo 7 caracteries';
    expect(err.message).toBe(passwordShorterThanAllowed);
  }
});

test("Test: Create an user with empty email", async () => {
  try {
    await useCase.save({
      email:"",
      username:username,
      password:"123456789"
    });
  }
  catch(err:any) {
    const emptyEmail = 'O campo de email não foi preenchido';
    expect(err.message).toBe(emptyEmail);
  } 
});

test('Test: Create an user with email length greater than allowed', async () => {
  try {
    await useCase.save({
      email:"asosakodksaodksaodksaodksaofajsfoajsfosajfojasfffffffjfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailLengthGreaterThanAllowed = 'O email só pode ter no máximo 100 caracteries';
    expect(err.message).toBe(emailLengthGreaterThanAllowed);
  }
});

test('Test: Create an user with an invalid email', async () => {
  try {
    await useCase.save({
      email:"ema^^~@....i.,;@outlook.com",
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailWithInvalidSyntax = 'Email inválido';
    expect(err.message).toBe(emailWithInvalidSyntax);
  }
});

test("Test: create an user with an email that doesn't end with .com ", async () => {
  try {
    await useCase.save({
      email:"olamundokk@outlook.br",
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailMustEndWithDotCom = 'Email deve terminar com "com"';
    expect(err.message).toBe(emailMustEndWithDotCom);
    "Email inválido, email não deve ter caracteries especiais"
  }
});

test("Test: create an user with an email that have more than one dot", async () => {
  try {
    await useCase.save({
      email:"ola.m.u.n.dokk@outlook.com",
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailMustNotHaveMoreThenOneDot = "Email inválido, email não deve ter caracteries especiais";
    expect(err.message).toBe(emailMustNotHaveMoreThenOneDot);
  }
});

test("Test: create an user with an email with invalid provider", async () => {
  try {
    await useCase.save({
      email:"SaveUseCase@glauberlindo.com",
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailHasInvalidProvider = 'Provedor do email inválido só aceitamos emails outlook, hotmail ou gmail';
    expect(err.message).toBe(emailHasInvalidProvider);
  }
});

test('Test: Create an user without an username', async () => {
  try {
    await useCase.save({
      email:email,
      username:'',
      password:'123456789'
    });
  }
  catch(err:any) {
    const usernameEmpty = 'Campo de username não foi preenchido';
    expect(err.message).toBe(usernameEmpty);
  }
});

test('Test: Create an user with length greater than allowed', async () => {
  try {
    await useCase.save({
      email:email,
      username:'safasfasfsafoskafoksafosakfoaskofaskfoakfoakfoakfoakakoakofaofakofsakkasfasfkasfkaskfaskfaskaksagfijireje49t34t34mt43kt4m343423',
      password:'123456789'
    });
  }
  catch(err:any) {
    const lengthOfUsernameGreaterThanAllowed = 'O username pode ter no máximo 30 caracteries';
    expect(err.message).toBe(lengthOfUsernameGreaterThanAllowed);
  }
});

test('Test: Create an user', async () => {
  await useCase.save({
    email:email,
    username:username,
    password:"123456789"
  }, true);
});

test('Test: Create an user with an email that alredy exists', async () => {
  try {
    await useCase.save({
      email:email,
      username:'SaveUseCase2',
      password:'123456789'
    });
  }
  catch(err:any) {
    const emailAlredyBeingUsed = 'Esse email já está sendo utilizado';
    expect(err.message).toBe(emailAlredyBeingUsed);
  }
});

test('Test: Create an user with an username that alredy exists', async () => {
  try {
    await useCase.save({
      email:'SaveUseCase2@hotmail.com',
      username:username,
      password:'123456789'
    });
  }
  catch(err:any) {
    const usernameAlredyBeingUsed = 'Esse username já está sendo utilizado';
    expect(err.message).toBe(usernameAlredyBeingUsed);
  }
});

afterAll(async () => {
  await user.delete(email);
  await mongose.disconnect();
});
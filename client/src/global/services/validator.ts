import {validate as validateEmail} from 'email-validator';

export default class Validator {

  //METHODS TO VALIDATE EMAIL
  public email(email:string) {
    const syntaxIsValid = validateEmail(email);
    const syntaxInvalidMessage = "Email inválido"; 
    if(!syntaxIsValid) throw syntaxInvalidMessage;
  }

  //METHODS TO VALIDATE PASSWORD
  public password(password:string, isLogin=true) {
    if(isLogin) return this.validatePasswordWhenLogin(password);
    this.validatePasswordWhenSignUp(password);
  }

  private validatePasswordWhenLogin(password:string) {
    const invalidPassword = "Senha errada";
    if(password.length < 7) throw invalidPassword;
  }

  private validatePasswordWhenSignUp(password:string) {
    const passwordShorterThan7 = "Senha deve ter no mínimo 7 caracteries";
    if(password.length < 7) throw passwordShorterThan7;
  }
}
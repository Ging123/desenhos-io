import exception from "../../util/exception";
import Base from "./base";

interface user {
  email:string;
  username:string;
  password:string;
}

export default class SaveUseCase extends Base {
  
  public async save(userData:user, testing=false) {
    this.validatePassword(userData.password);
    this.emailUtil.validate(userData.email);
    await this.verifyIfEmailOrUsernameAlredyExist(userData.email, userData.username);
    await this.user.save(userData, testing);
  }

  //METHOD TO VALIDATE PASSWORD
  private validatePassword(password:string) {
    if(!password) throw exception('Campo de senha não foi preenchido');
    if(password.length > 30) throw exception('A senha pode ter no máximo 30 caracteries');
    if(password.length < 7) throw exception('A senha deve ter no mínimo 7 caracteries');
  }

  //METHODS TO VERIFY IF EMAIL OR USERNAME EXISTS
  private async verifyIfEmailOrUsernameAlredyExist(email:string, 
  username:string) {
    await this.verifyIfEmailAlredyExists(email);
    await this.verifyIfUsernameAlredyExists(username);
  }

  private async verifyIfEmailAlredyExists(email:string) {
    const errorMessage = 'Esse email já está sendo utilizado';
    await this.user.findOneByEmail(email)
    .then((emailExists) => { 
      if(emailExists) throw exception(errorMessage) 
    });
  }

  private async verifyIfUsernameAlredyExists(username:string) {
    const errorMessage = 'Esse username já está sendo utilizado';
    await this.user.findOneByUsername(username)
    .then((usernameAlredyExists) => { 
      if(usernameAlredyExists) throw exception(errorMessage); 
    });
  }
}
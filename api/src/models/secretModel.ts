import SecretCollection from "../database/secretCollection";
import EmailUtil from "../util/emailUtil";
import exception from "../util/exception";
import apiUrl from "../util/url";

export default class SecretModel extends SecretCollection {

  private readonly emailUtil = new EmailUtil();

  //METHODS TO CREATE A NEW SECRET CODE
  public async save(email:string) {
    await this.deleteOldSecret(email);
    const secret = this.createNewSecret(email);
    await secret.save();
  }

  //METHOD TO DELETE AN OLD SECRET CODE
  public async deleteOldSecret(email:string) {
    await this.findByEmail(email)
    .then(async (secret) => {
      if(secret) await this.deleteByEmail(email);
    });
  }

  //METHODS TO SEND AN EMAIL WITH THE SECRET CODE
  public async sendInEmail(email:string) {
    await this.createAValidatorLink(email)
    .then(async (validatorLink) => {
      await this.emailUtil.sendAnEmail({
        to:email,
        subject:'Verifique seu email :)',
        text:`<h1>Olá aqui é o site desenhos.io</h1>
        <div>clique  
        <a _target="_blank " href="${validatorLink}">aqui</a> 
        para confirmar seu email :)</div>`
      });
    });
  }

  private async createAValidatorLink(email:string) {
    return new Promise((link) => {
      this.findByEmail(email)
      .then((secret:any) => {
        if(!secret) throw exception('Código de verificação expirou', 401);
        link(`${apiUrl()}/user/confirm?email=${email}&code=${secret.secretToVerifyEmail}`);
      });
    });
  }

  //METHOD TO VERIFY IF EMAIL AND CODE IS VALID
  public async verifyIfCodeAndEmailAreValid(email:string, code:string) {
    await this.findByEmail(email)
    .then((secret:any) => {
      if(!secret) throw exception('Codigo de verificação inválido', 401);
      if(secret.secretToVerifyEmail !== code) throw exception('Código de verificação incorreto');
    });
  }

  //METHOD TO GET CODE SECRET CODE
  public getCode(email:string) {
    return new Promise((sucess) => {
      this.findByEmail(email)
      .then((secret:any) => {
       if(secret) sucess(secret.secretToVerifyEmail)
      });
    });
  }
} 
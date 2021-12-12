import * as EmailValidator from 'email-validator';
import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import exception from './exception';

interface emailSender {
  to:string;
  subject:string;
  text:string;
}

type transporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

export default class EmailUtil {

  //METHODS TO VALIDATE EMAIL 
  public validate(email:string) {
    this.validateSyntax(email);
    this.validateProvider(email);
  }

  private validateSyntax(email:string) {
    if(!email) throw exception('O campo de email não foi preenchido');
    if(email.length > 100) throw exception('O email só pode ter no máximo 100 caracteries');
    const syntaxIsValid = EmailValidator.validate(email);
    if(!syntaxIsValid) throw exception('Email inválido');
    this.verifyIfEmailEndWithCom(email);
  }

  private verifyIfEmailEndWithCom(email:string) {
    this.verifyIfEmailHasMoreThanOneDot(email);
    const threeLastLetters = email.split('.')[1];
    if(threeLastLetters !== 'com') throw exception('Email deve terminar com "com"');
  }

  private verifyIfEmailHasMoreThanOneDot(email:string) {
    const errorMessage = 'Email inválido, email não deve ter caracteries especiais';
    const dots = email.split('.');
    if(dots.length > 2) throw exception(errorMessage);
  }

  private validateProvider(email:string) {
    const errorMessage = 'Provedor do email inválido só aceitamos emails outlook, hotmail ou gmail';
    const validProviders = ['outlook', 'hotmail', 'gmail'];
    const emailProvider = this.getEmailProvider(email);
    for(const provider of validProviders) {
      if(emailProvider === provider) return;
    }
    throw exception(errorMessage);
  }

  //METHODS TO SEND A EMAIL
  public async sendAnEmail(senderInfo:emailSender) {
    const receiverProvider = this.getEmailProvider(senderInfo.to);
    const transporter = this.getTransporter(receiverProvider);
    const from = this.getSenderEmail(receiverProvider);
    const options = this.createEmailSenderOptions(senderInfo, from);
    this.send(transporter, options)
  }

  private getEmailProvider(email:string) {
    let provider = email.split('@')[1];
    provider = provider.replace('.com', '');
    return provider;
  }

  private getTransporter(provider:string) {
    if(provider === 'gmail') return this.gmailTransporter();
    return this.outlookTransporter();
  }

  private getSenderEmail(clientProvider:string) {
    if(clientProvider === 'gmail') return process.env.GMAIL_EMAIL!;
    return process.env.OUTLOOK_EMAIL!;
  }

  private outlookTransporter() {
    return nodemailer.createTransport({
      service:"hotmail",
      auth: {
        user:process.env.OUTLOOK_EMAIL!,
        pass:process.env.OUTLOOK_PASSWORD!
      }
    });
  }

  private gmailTransporter() {
    return nodemailer.createTransport({
      service:"gmail",
      auth: {
        user:process.env.GMAIL_EMAIL!,
        pass:process.env.GMAIL_PASSWORD!
      }
    });
  }

  private createEmailSenderOptions(senderInfo:emailSender, senderEmail:string) {
    return {
      from: senderEmail,
      to:senderInfo.to,
      subject:senderInfo.subject,
      html:senderInfo.text
    }
  }

  private send(transporter:transporter, options:object) {
    transporter.sendMail(options, (err:unknown) => {
      if(err) throw err;
    });
  }
}
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class SecretCollection {

  private readonly expiresTime = '10m';

  private readonly secretScema = new Schema({
    email: {
      type:String,
      unique:true,
      require:true
    },
    secretToVerifyEmail: {
      type:String,
      require:true
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: this.expiresTime }
    },
  });

  private readonly secretModel = mongoose.models.secrets || mongoose.model('secrets', this.secretScema);

  protected createNewSecret(email:string) {
    return new this.secretModel({
      email:email,
      secretToVerifyEmail:uuidv4()
    });
  }

  protected findByEmail(email:string) {
    return new Promise(async (sucess) => {
      await this.secretModel.findOne({ email:email })
      .then((secret) => sucess(secret));
    });
  }

  protected deleteByEmail(email:string) {
    return new Promise(async (sucess) => {
      await this.secretModel.deleteOne({ email:email })
      .then((secret) => sucess(secret));
    });
  }
}
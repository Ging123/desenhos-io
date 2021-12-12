import mongoose from "mongoose";
import exception from "../util/exception";
const Schema = mongoose.Schema;

interface user {
  email:string;
  username:string;
  password:string;
}

export default class UserCollection {

  private readonly userSchema = new Schema({
    email: {
      type:String,
      required:[true, 'Campo de email não foi preechido'],
      maxLength:[100],
      index:true,
      unique: true
    },
    username: {
      type:String,
      required:[true, 'Campo de username não foi preenchido'],
      maxLength:[30, 'O username pode ter no máximo 30 caracteries'],
      index:true,
      unique:true
    },
    password: {
      type:String,
      required:[true],
      maxlength:[100]
    },
    refreshToken: {
      type:String
    },
    confirmed: {
      type:Boolean
    }
  });

  private readonly userModel = mongoose.models.users || mongoose.model('users', this.userSchema);

  protected createNewUser(user:user) {
    return new this.userModel({
      email:user.email,
      username:user.username,
      password:user.password,
      confirmed:false
    });
  }

  public findOneByEmail(email:string) {
    return new Promise(async (sucess) => {
      await this.userModel.findOne({ email:email })
      .then((user) => sucess(user));
    });
  }

  public findOneByUsername(username:string) {
    return new Promise(async (sucess) => {
      await this.userModel.findOne({ username:username })
      .then((user) => sucess(user));
    });
  }

  public findOneByEmailOrUsername(emailOrUsername:string) {
    return new Promise(async (sucess) => {
      await this.userModel.findOne({ 
        $or: [ {email:emailOrUsername}, {username:emailOrUsername} ]
      })
      .then((user) => sucess(user));
    });
  }

  public findOneById(id:string) {
    return new Promise(async (sucess) => {
      await this.userModel.findOne({ _id:id })
      .then((user) => sucess(user));
    });
  }

  protected deleteOneByEmail(email:string) {
    return new Promise(async (sucess) => {
      await this.userModel.deleteOne({ email:email })
      .then((user) => sucess(user));
    });
  }

  protected async insert(user:any) {
    await user.save()
    .catch((err:any) => { 
      throw exception(this.moongoseError(err))
    });
  }

  private moongoseError(err:any) {
    for(const key in err.errors) {
      return err.errors[key].message;
    }
  }
}
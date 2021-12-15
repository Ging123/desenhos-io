import exception from "../util/exception";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class RoomCollection {

  private readonly roomSchema = new Schema({
    players_inside: {
      type:Number,
      max:[10, "Sala atingiu máximo de jogadores"],     
    }
  });

  private readonly roomModel = mongoose.models.rooms || mongoose.model('rooms', this.roomSchema);

  protected createANewRoom() {
    return new this.roomModel({
      players_inside:1
    });
  } 

  public findOneById(id:any) {
    return new Promise(async (sucess) => {
      await this.roomModel.findById(id)
      .then((room) => sucess(room));
    });
  }

  public findOneFreeRoom() {
    return new Promise(async (sucess) => {
      await this.roomModel.findOne({'players_inside':{$lt:10}})
      .then((room) => sucess(room));
    });
  }

  protected deleteOneById(id:any) {
    return new Promise(async (sucess) => {
      await this.roomModel.deleteOne({'_id':id})
      .then((room) => sucess(room));
    });
  }

  protected insert(room:any) {
    return new Promise(async (sucess) => {
      await room.save()
      .then((roomSaved:any) => sucess(roomSaved)).
      catch((err:any) => { 
        throw exception(this.moongoseError(err))
      });
    });
  }

  private moongoseError(err:any) {
    for(const key in err.errors) {
      return err.errors[key].message;
    }
  }
}
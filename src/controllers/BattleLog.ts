import * as express from "express";
import * as mongoose from "mongoose";
import { PlayerUtils } from "../utils/player.utils";
import { CRService } from "../services/cr.service";
import { BattleLogSchema } from "../models/BattleLogSchema";
import { BattleLog } from "../models/battlelog/BattleLog";
import { data } from "../../tests/player/playerData";

const battleLogModel = mongoose.model("BattleLog",BattleLogSchema);
export class BattleLogController{

  async fetchBattlelog(
    req: express.Request,
    res: express.Response,
    next:express.NextFunction 
  ){
    try{

      let tag = PlayerUtils.validatePlayerTag(req.params.tag);
      
      const response = await CRService.get(`v1/players/%23${tag}/battlelog`);
      const battlelog:BattleLog[] = response.data;
      
      let schema = new battleLogModel({_id:tag,BattleLog:battlelog.map(data =>{
        return data;
      })
    });
      
      let battlelogExists = await battleLogModel.findById(tag);
      
      if(!battlelogExists){ 
        schema.save();
      }else{
        battleLogModel.updateOne({},{BattleLog:battlelog.map(data =>{
          return data;
        })
      },(err,raw)=>{
          if(err) throw err;
        });
      }
      return res.json({...battlelog});
    } catch(e){
      next(e);
    }
  }

}
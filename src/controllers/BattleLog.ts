import * as express from "express";
import * as mongoose from "mongoose";
import { PlayerUtils } from "../utils/player.utils";
import { CRService } from "../services/cr.service";
import { BattleLogSchema } from "../models/BattleLogSchema";
import { BattleLog } from "../models/battlelog/BattleLog";
import {tagBattleUtils } from "../utils/tagBattle.utils";



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
     
      for (let index = 0; index < battlelog.length; index++) {
        for (let i = 0; i < battlelog[index].team.length; i++) {
          const _id = tagBattleUtils.generateTag(battlelog[index].team[i].tag, battlelog[index].opponent[i].tag, battlelog[index].battleTime)
          let battlelogExists = await battleLogModel.findById(_id);
          if(!battlelogExists){ 
            const schema = new battleLogModel({_id:_id, ...battlelog[index]})          
              .save();
          }
        } 
      }
      
    return res.json({...battlelog});
    } catch(e){
      next(e);
    }
  }

}
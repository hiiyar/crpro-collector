import * as mongoose from "mongoose";
import { PlayersSchema } from "../models/SchemaPlayer";
import { Request, Response } from "express";

import { CRService } from "../services/cr.service";

import { Player } from "../models/player/Player";

const PlayerSchema = mongoose.model("Player", PlayersSchema);

export class PlayerController {
  async addNewPlayer(req: Request, res: Response) {
    try {
      const response = await CRService.get("v1/players/%23GQV0P8");
      
      let newPlayer = new Player(response.data);
      let newSchemaPlayer = new PlayerSchema({...newPlayer})
      newSchemaPlayer.save((err,player)=>{
        if(err){
          res.send(err);
        }    
      return res.json(player);
      })
     
    } catch (e) {
      throw e;
    }
  }
  async getPlayers(req: Request, res: Response){
   PlayerSchema.find({},(err, player)=>{
    if(err){
      res.send(err);
    }
  res.json(player);
   })
  }
}

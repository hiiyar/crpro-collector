import * as mongoose from "mongoose";
// import { PlayersSchema } from "../models/SchemaPlayer";
import { Request, Response } from "express";

import { CRService } from "../services/cr.service";

import { Player } from "../models/player/Player";

// const Player = mongoose.model("Player", PlayersSchema);

export class PlayerController {
  async addNewPlayer(req: Request, res: Response) {
    try {
      const response = await CRService.get("v1/players/%23PL8RQRJ9J");

      let newPlayer = new Player(response.data);

      return res.send({ ...newPlayer });
    } catch (e) {
      throw e;
    }
  }
}

import * as express from "express"
import * as mongoose from "mongoose";

import { BattleLogSchema } from "../models/BattleLogSchema";
import { PlayerUtils } from "../utils/player.utils";
import { json } from "body-parser";

const BattleModel = mongoose.model("BattleLog", BattleLogSchema);

export class BattleController {
  async fetchBattle(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const _id = req.params.id

      const data = await BattleModel.findById(_id, (err, res) => {
        if (err) throw err;
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}
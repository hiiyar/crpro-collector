import * as express from "express";
import * as mongoose from "mongoose";

/**
 * Services
 */
import { CRService } from "../services/cr.service";

/**
 * Dependencies
 */
import { PlayerSchema } from "../models/PlayerSchema";
import { BattleLogSchema } from "../models/BattleLogSchema";
import { PlayerUtils } from "../utils/player.utils";
import { tagBattleUtils } from "../utils/tagBattle.utils";
import { validateTagUtils } from "../utils/validateTag.utils";

/**
 * Models
 */
import { Player } from "../models/player/Player";
import { BattleLog } from "../models/battlelog/BattleLog";

const playerModel = mongoose.model("Player", PlayerSchema);
const battleLogModel = mongoose.model("BattleLog", BattleLogSchema);

export class PlayerController {
  async fetchPlayer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // Validate and fix player tag
      let tag = PlayerUtils.validatePlayerTag(req.params.tag);

      // Do the request
      const response = await CRService.get(`v1/players/%23${tag}`);
      const player: Player = response.data;

      // Declare player schema
      let schema = new playerModel({
        _id: tag,
        ...player,
        lastUpdate: new Date()
      });

      // Create a document if not exists or update it
      playerModel.collection.findOneAndUpdate(
        {
          _id: tag
        },
        schema,
        { upsert: true },
        (err, raw) => {
          if (err) throw err;
        }
      );

      return res.json(schema.toJSON());
    } catch (e) {
      next(e);
    }
  }
  async fetchBattlelog(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {

      let tag = PlayerUtils.validatePlayerTag(req.params.tag);

      const response = await CRService.get(`v1/players/%23${tag}/battlelog`);
      const battlelog: BattleLog[] = response.data;

      for (let index = 0; index < battlelog.length; index++) {
        for (let i = 0; i < battlelog[index].team.length; i++) {

          const _id = tagBattleUtils.generateTag(battlelog[index].team[i].tag,
            battlelog[index].opponent[i].tag,
            battlelog[index].battleTime)

          const tags = [validateTagUtils.validate(battlelog[index].team[i].tag),
          validateTagUtils.validate(battlelog[index].opponent[i].tag)]

          let battlelogExists = await battleLogModel.findById(_id);
          if (!battlelogExists) {
            const schema = new battleLogModel({ _id: _id, ...battlelog[index], tags: tags })
              .save();
          }
        }
      }

      return res.json({ ...battlelog });
    } catch (e) {
      next(e);
    }
  }
}

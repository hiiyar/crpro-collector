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
import { battleUtils } from "../utils/tagBattle.utils";

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
      const tag = PlayerUtils.validatePlayerTag(req.params.tag);

      const response = await CRService.get(`v1/players/%23${tag}/battlelog`);

      const battlelog: BattleLog[] = response.data;
      const battles: mongoose.Document[] = [];

      /**
       * Iterate over found matches
       */
      for (let index = 0; index < battlelog.length; index++) {
        const battle = battlelog[index];

        const _id = battleUtils.generateBattleId(
          battle.team,
          battle.opponent,
          battle.battleTime
        );

        const tags = battleUtils.getPlayersTags(battle.team, battle.opponent);

        let battleExists = await battleLogModel.findById(_id);

        if (!battleExists) {
          const schema = new battleLogModel({
            _id,
            tags,
            ...battle
          });

          await schema.save((err, raw) => {
            if (err) throw err;
          });

          battles.push(schema);
        } else {
          battles.push(battleExists);
        }
      }

      return res.json({ ...battles });
    } catch (e) {
      next(e);
    }
  }
}

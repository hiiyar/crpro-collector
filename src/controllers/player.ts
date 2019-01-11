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
import { PlayerUtils } from "../utils/player.utils";

/**
 * Models
 */
import { Player } from "../models/player/Player";

const playerModel = mongoose.model("Player", PlayerSchema);

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
      let schema = new playerModel({ _id: tag, ...player });

      // Check if exists
      let playerExists = await playerModel.findById(tag);

      if (!playerExists) {
        schema.save();
      } else {
        playerModel.updateOne({}, { ...player }, (err, raw) => {
          if (err) throw err;
        });
      }

      return res.json({ ...player });
    } catch (e) {
      next(e);
    }
  }
}

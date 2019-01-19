import * as express from "express";
import * as mongoose from "mongoose";

import { CRService } from "../services/cr.service";

import { validateTagUtils } from "../utils/validateTag.utils";
import { ClanSchema } from "../models/ClanSchema";
import { Clan } from "../models/clan/Clan";

const clanModel = mongoose.model("Clan", ClanSchema);

export class ClanController {
  async fetchClan(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      let tag = validateTagUtils.validate(req.params.tag);
      let response = await CRService.get(`/v1/clans/%21${tag}`);

      let clan: Clan = response.data;

      const schema = new clanModel({
        _id: tag,
        ...clan
      });

      // Create a document if not exists or update it
      clanModel.collection.findOneAndUpdate(
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
}

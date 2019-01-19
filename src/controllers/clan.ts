import * as express from "express";
import * as mongoose from "mongoose";
import axios from "axios";

/**
 * Services
 */
import { CRService } from "../services/cr.service";

/**
 * Models
 */

import { ClanSchema } from "../models/ClanSchema";
import { Clan } from "../models/clan/Clan";
import { ClanMembersList } from "models/clan/ClanMembersList";

/**
 * Utils
 */
import { validateTagUtils } from "../utils/validateTag.utils";

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

  async fetchClanMembers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const tag = validateTagUtils.validate(req.params.tag);
      const response = await CRService.get(`/v1/clans/%21${tag}/members`);

      const clanMembers: ClanMembersList = response.data;
      const clanExists = await clanModel.findById(tag);

      // It will do a request to fetch clan data
      if (!clanExists) {
        await axios.get(`${req.protocol}://${req.get("host")}/clan/${tag}`);
      }

      /**
       * Update to the latest members information
       */
      await clanModel.updateOne(
        {
          _id: tag
        },
        {
          memberList: clanMembers.items
        }
      );

      // Get the latest clan data
      const updatedClanData = await clanModel.findById(tag);

      if (!updatedClanData) {
        throw Error("Could not fetch clan data");
      }

      return res.json(updatedClanData.toObject().memberList);
    } catch (e) {
      next(e);
    }
  }
}

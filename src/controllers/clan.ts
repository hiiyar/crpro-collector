import * as express from "express";

import { CRService } from "../services/cr.service";

import { validateTagUtils } from "../utils/validateTag.utils";
import { Clan } from "../models/clan/Clan";

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

      console.log(clan.memberList);

      return res.json(tag);
    } catch (e) {
      next(e);
    }
  }
}

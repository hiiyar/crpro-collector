import * as express from "express";

import { PlayerUtils } from "utils/player.utils";

export class ClanController {
  async fetchClan(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      let tag = PlayerUtils.validatePlayerTag(req.params.tag);

      return res.json(tag);
    } catch (e) {
      next(e);
    }
  }
}

import { Router } from "express";
import { ClanController } from "../controllers/clan";

class Routes {
  router = Router();

  private clanController: ClanController = new ClanController();

  constructor() {
    this.routes();
  }

  routes() {
    this.fetchClan();
  }

  fetchClan() {
    this.router.get("/:tag", this.clanController.fetchClan);
  }
}

export const ClanRoutes = new Routes().router;

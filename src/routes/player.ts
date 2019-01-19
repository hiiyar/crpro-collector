import { Router } from "express";
import { PlayerController } from "../controllers/player";

class Routes {
  router = Router();

  private playerController: PlayerController = new PlayerController();

  constructor() {
    this.routes();
  }

  routes() {
    this.fetchPlayer();
  }

  /**
   * This method will fetch the data from crapi and save it to the database
   * Path: /player
   */
  fetchPlayer() {
    this.router.get("/:tag", this.playerController.fetchPlayer);
    this.router.get("/:tag/battles", this.playerController.fetchBattlelog);
  }
}

export const PlayerRoutes = new Routes().router;

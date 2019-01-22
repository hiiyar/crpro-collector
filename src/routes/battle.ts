import { Router } from "express";
import { BattleController } from "../controllers/battle";

class Routes {
  router = Router();

  private battleController: BattleController = new BattleController();

  constructor() {
    this.routes();
  }

  routes() {
    this.fetchBattle();
  }

  fetchBattle() {
    this.router.get("/:id", this.battleController.fetchBattle);
  }
}

export const BattleRoutes = new Routes().router;

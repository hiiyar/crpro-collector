import { Router } from "express";
import { BattleLogController } from "../controllers/BattleLog";

class Routes {
  router = Router();

  private battleController:BattleLogController = new BattleLogController;

  constructor() {
    this.routes();
  }
  routes(){
    this.fetchBattleLog();
  }

  fetchBattleLog(){
    this.router.get("/:tag", this.battleController.fetchBattlelog);
  }
  
}

export const BattleLogRoutes = new Routes().router;
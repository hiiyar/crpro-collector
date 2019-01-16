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
    this.router.get("/:tag/battles",this.playerController.fetchBattlelog)
  }

  // public routes(app: express.Application): void {
  //   app.route("/").get((req: express.Request, res: express.Response) => {
  //     res.status(200).send({
  //       messagem: "deu certo"
  //     });
  //   });

  //   app.route("/player").get(this.playerController.addNewPlayer);
  //   // .get(this.playerController.getPlayers);
  // }
}

export const PlayerRoutes = new Routes().router;

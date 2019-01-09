import * as express from "express";
import { PlayerController } from "../controllers/player";

export class Routes {
  public playerController: PlayerController = new PlayerController();
  public routes(app: express.Application): void {
    app.route("/").get((req: express.Request, res: express.Response) => {
      res.status(200).send({
        messagem: "deu certo"
      });
    });
    app.route("/player")
      .put(this.playerController.addNewPlayer)
      .get(this.playerController.getPlayers);
  }
}

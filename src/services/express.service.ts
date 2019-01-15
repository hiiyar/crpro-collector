import * as express from "express";
import * as bodyParser from "body-parser";

/**
 * Collector routes
 */
import { PlayerRoutes } from "../routes/player";
import { BattleLogRoutes } from "../routes/battleLog";

class Service {
  app: express.Application = express();

  constructor() {}

  private config(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.app) {
        throw Error("Express is not initialized.");
      }

      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));

      // add routes
      this.app.use("/player", PlayerRoutes);
      this.app.use("/player/battlelog",BattleLogRoutes);

      // add not found
      this.app.use(this.notFound);

      // add error handler
      this.app.use(this.errorHandler);

      resolve();
    });
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log("Starting express...");

        const PORT = process.env.PORT || 3000;

        if (!this.app) {
          throw Error("App is not initialized.");
        }

        // express configuration
        this.config();

        this.app.listen(PORT, () =>
          console.log(`Express running on port: ${PORT}`)
        );

        resolve();
      } catch (e) {
        console.log("vim start");
      }
    });
  }

  /**
   * Not found
   */
  notFound(req: express.Request, res: express.Response) {
    res.status(404).send({
      error: true,
      message: "The requested endpoint could not be found."
    });
  }

  /**
   * Error handler
   */
  errorHandler(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.status(500).send({
      error: true,
      message: err.message
    });
  }
}

export const ExpressService = new Service();

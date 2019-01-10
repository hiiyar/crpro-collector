/**
 * Services
 */
import { MongoService } from "./services/mongo.service";
import { ExpressService } from "./services/express.service";

class Server {
  constructor() {
    console.log("Starting crpro collector...");
  }

  async start() {
    try {
      // Mongo service
      await MongoService.start();

      // Express service
      await ExpressService.start();
    } catch (e) {
      console.log(e.message);
    }
  }
}

new Server().start();

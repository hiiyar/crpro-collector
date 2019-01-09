import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/player";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoURL: string = `${process.env.DB_HOST}`

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.mongoSetup();
  }
  private mongoSetup(){
    mongoose.connect(
      'mongodb://assisneto:assisneto@cluster0-shard-00-00-qhyrk.mongodb.net:27017,cluster0-shard-00-01-qhyrk.mongodb.net:27017,cluster0-shard-00-02-qhyrk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
      {
      useNewUrlParser: true
    });
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;

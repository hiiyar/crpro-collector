import * as mongoose from "mongoose";

class Service {
  mongooseInstance?: typeof mongoose;

  constructor() {}

  start(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Connecting to mongo...");

        this.mongooseInstance = await mongoose.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
            process.env.DB_HOST
          }/${process.env.DB_DATABASE}?retryWrites=true`,
          { useNewUrlParser: true }
        );

        console.log("Connected!");
        resolve();
      } catch (e) {
        throw e;
      }
    });
  }
}

export const MongoService = new Service();

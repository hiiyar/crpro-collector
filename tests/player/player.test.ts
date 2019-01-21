import * as supertest from "supertest";
import * as chai from "chai";
import * as chaiJsonSchema from "chai-json-schema";

import { ExpressService } from "../../src/services/express.service";
import { MongoService } from "../../src/services/mongo.service";

import { playerData } from "../schemas/playerData";

chai.use(chaiJsonSchema);
chai.should();

const request = supertest(ExpressService.app);

describe("Information Player", () => {
  before(async () => {
    await MongoService.start();
    await ExpressService.start();
  });

  after(() => {
    MongoService.stop();
    ExpressService.stop();
  });

  it("PlayerData is json", done => {
    request
      .get("/player/9CQJQYP2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("Player Schema", done => {
    request.get("/player/9CQJQYP2").end((err, res) => {
      chai.expect(res.body).to.be.jsonSchema(playerData);
      done();
    });
  });

  it("informing wrong tag", done => {
    request.get("/player/P2").expect(500, done);
  });

  it("informing tag without # ", done => {
    request.get("/player/9CQJQYP2").expect(200, done);
  });

  it("informing tag with # ", done => {
    request.get("/player/%239CQJQYP2").expect(200, done);
  });

  it("informing tag with literally # ", done => {
    request.get("/player/#9CQJQYP2").expect(404, done);
  });
});

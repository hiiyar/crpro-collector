import * as supertest from "supertest";
import * as chai from "chai";
import * as chaiJsonSchema from "chai-json-schema";

import { ExpressService } from "../../src/services/express.service";
import { MongoService } from "../../src/services/mongo.service";

import { battlesData } from "./battlesData";
import { battleData } from "./battleData";

chai.use(chaiJsonSchema);
chai.should();

const request = supertest(ExpressService.app);

describe("Player battles", () => {
  before(async () => {
    await MongoService.start();
    await ExpressService.start();
  });

  after(() => {
    MongoService.stop();
    ExpressService.stop();
  });

  it("BattlesData is json", done => {
    request
      .get("/player/9CQJQYP2/battles")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("Battles Schema", done => {
    request.get("/player/9CQJQYP2/battles").end((err, res) => {
      chai.expect(res.body).to.be.jsonSchema(battlesData);
      done();
    });
  });

  it("Battles Schema has a tag array", done => {
    request.get("/player/9CQJQYP2/battles").end((err, res) => {
      res.body.battles.map((data: any) => {
        chai.expect(data.tags).to.be.an("array");
      });

      done();
    });
  });

  it("One Battle Schema", done => {
    request
      .get("/battle/28VQ0JVC08V82PYL220190118T210027.000Z")
      .end((err, res) => {
        chai.expect(res.body).to.be.jsonSchema(battleData);
        done();
      });
  });
});

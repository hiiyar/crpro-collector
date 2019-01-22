import * as supertest from "supertest";
import * as chai from "chai";
import * as chaiJsonSchema from "chai-json-schema";

import { ExpressService } from "../../src/services/express.service";
import { MongoService } from "../../src/services/mongo.service";

import { clanData } from "../schemas/clanData";


chai.use(chaiJsonSchema);
chai.should();

const request = supertest(ExpressService.app);

describe("Clans test", () => {
  before(async () => {
    await MongoService.start();
    await ExpressService.start();
  });

  after(() => {
    MongoService.stop();
    ExpressService.stop();
  });

  it("Clan is json", done => {
    request
      .get("/clan/9YGJC8LU")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("Clan Schema", done => {
    request.get("/clan/9YGJC8LU").end((err, res) => {
      chai.expect(res.body).to.be.jsonSchema(clanData);
      done();
    });
  });

  it("Clan members has a player array", done => {
    request.get("/clan/9YGJC8LU/members").end((err, res) => {
      chai.expect(res.body).to.be.an("array");
      done();
    });
  });

  it("fetch clan members information is equal to clan members", done => {
    let length = 0
    request.get("/clan/9YGJC8LU").end((err, res) => {
      length = res.body.memberList.length
    });
    request.get("/clan/9YGJC8LU/members").end((err, res) => {
      chai.expect(res.body.length).to.be.equal(length);
      done();
    });
  });

});

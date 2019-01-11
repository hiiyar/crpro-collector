import * as supertest from "supertest";
import * as chai from "chai";
import * as chaijsonschema from "chai-json-schema";
import { playertest } from "./PlayerJson";
import { json } from "body-parser";


chai.use(chaijsonschema);
chai.should()

const request = supertest('localhost:3000');



describe('Information Player',  ()=>{
  it('Data is json', (done)=> {
    request.get('/player/9CQJQYP2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done);
    });

  it('Player Schema',(done)=>{
    request.get('/player/9CQJQYP2').end((err,res)=>{
      
      chai.expect(res.body).to.be.jsonSchema(playertest)
      //xchai.expect(res.body.name).to.be.a('string')
      done()
    })
  })

  it('informing wrong tag',(done)=>{
    request.get('/player/P2')
      .expect(500,done)
  })

  it('informing tag without # ',(done)=>{
    request.get('/player/9CQJQYP2')
      .expect(200,done)
  })
  
  it('informing tag with # ', (done)=>{
    request.get('/player/%239CQJQYP2')
    .expect(200,done)
  })

  it('informing tag with literally # ',(done)=>{

    request.get('/player/#9CQJQYP2')
    .expect(404,done)
  })
})
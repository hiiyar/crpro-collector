import * as mongoose from 'mongoose';
import { PlayersSchema } from '../models/SchemaPlayer';
import { Request, Response } from 'express';
import * as axios from 'axios'

const Player =mongoose.model('Player',PlayersSchema);

export class PlayerController {
  
  public addNewPlayer(req:Request, res:Response){
    const api = axios.default.create({
      baseURL: 'https://api.clashroyale.com/',
      headers: {
        Accept: 'application/json',
        authorization:`${process.env.API_KEY}`,
      },
    })
    const response = api.get('v1/players/%23QULC80YP')
      .then((data)=>{
        console.log(data.data)
      });
    // //let newPlayer = new Player(req.body);

    // console.log(newPlayer);

    // newPlayer.save((err, player)=>{
    //   if(err){
    //     res.send(err);
    //   }    
    //   res.json(player);
    // })

  }

}
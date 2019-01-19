import { CRService } from "../services/cr.service";
import { PlayerUtils } from "../utils/player.utils";

import axios from "axios";

const getPlayer = async (tag: string) => {
  try {
    console.log(`Collecting ${tag} opponents...`);

    let response = await CRService.get(`v1/players/%23${tag}/battlelog`);

    let data: object[] = response.data;

    if (data.length === 0) {
      console.log("There is no battle for this player");
      process.exit();
    }

    // Iterate over all matches
    data.forEach((match: any) => {
      match.opponent.forEach(async (opponent: any) => {
        let pTag = PlayerUtils.validatePlayerTag(opponent.tag);

        console.log(`Querying ${pTag}...`);
        await axios.get(`http://localhost:3000/player/${pTag}`);
        
        console.log(`Querying battles ${pTag}...`);
        await axios.get(`http://localhost:3000/player/${pTag}/battles`);
        console.log('Querying battles OK');

      });
    });

    /**
     * Get random opponent by a random match
     */
    let randomMatch = Math.floor(Math.random() * data.length);
    let match: any = data[randomMatch];
    let matchOpponents = match.opponent;

    let randomOpponent = Math.floor(Math.random() * matchOpponents.length);
    let opponent = matchOpponents[randomOpponent];

    let playerTag = PlayerUtils.validatePlayerTag(opponent.tag);

    console.log("Searching for next tag!");

    getPlayer(playerTag);
  } catch (error) {
    console.log(error);
  }
};

const main = () => {
  getPlayer("2JGYG2YY");
};

main();

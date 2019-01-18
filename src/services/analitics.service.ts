import { ElasticSearchService } from "./elasticsearch.service";

class Service {

  setPlayerSummary = async(tag: string, playerData: any) => {
    // Put here your custom data about player
    // ...
    // ...

    return playerData;

  }

}

export const AnaliticsService = new Service();
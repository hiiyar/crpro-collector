
import { Client } from "elasticsearch";

class Service {
  
  client: Client = new Client({ host: [
    {
      host: process.env.ELASTICSEARCH_HOST,
      auth: `${process.env.ELASTICSEARCH_USER }:${process.env.ELASTICSEARCH_PASSWORD }`,
      protocol: 'https',
      port: 9243
    }
  ]});
  
  constructor() {}

  /**
   * Put values to server
   */
  pushData = async (index: string, type: string, id: string, body: any) => {
    
    return new Promise(async (resolve, reject) => {

      const document = await this.findDocument(index, type, id, body);
      
      this.client.index({
        index,
        type,
        id,
        body: document
      }, (err: any, status: any) => {
        if (err) {
          return reject(err)
        }
        return resolve(status);
      });

    });
  }

  findDocument = async (index: string, type: string, id: string, body: any) => {
    
    const exists = await this.documentExists(index, type, id);
    
    if (!exists)
      return body;

    const result  = await this.client.get({
      index,
      type, 
      id
    });

    return result._source;

  }

  documentExists = async (index: string, type: string, id: string) => {
    if (this.client)
      return await this.client.exists({index, type, id});
  }

}

  
export const ElasticSearchService = new Service();
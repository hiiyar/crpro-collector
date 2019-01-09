import * as axios from "axios";

class Service {
  axios?: axios.AxiosInstance;

  constructor() {
    this.axios = axios.default.create({
      baseURL: "https://api.clashroyale.com/",
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.API_KEY}`
      }
    });
  }

  public get(route: string): Promise<axios.AxiosResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.axios) {
          throw new Error("Axios instance have not been initialized.");
        }

        let request = await this.axios.get(route);

        if (request.status !== 200) {
          throw new Error(request.data);
        }

        resolve(request);
      } catch (e) {
        throw e;
      }
    });
  }
}

export const CRService = new Service();

import axios from "axios";
import toCamelCase from "camelcase-keys";
import { APISearchResponse, APISearchResponseResult } from "./schema";

export interface SuperheroesServiceInterface {
  readonly endpoint: string;
  search: (name: string) => Promise<APISearchResponseResult[]>;
}

export class SuperheroesService implements SuperheroesServiceInterface {
  constructor(readonly endpoint: string) {}

  search = async (name: string): Promise<APISearchResponseResult[]> => {
    const res = await axios.get<APISearchResponse>(`${this.endpoint}/search/${name}`, {
      transformResponse: [(data) => toCamelCase(JSON.parse(data), { deep: true })],
    });

    //TODO
    //http error
    //unauthorized
    //not found

    if (res.status === 200 && res.data.response === "error") {
      return [];
    }

    return res.data.results;
  };
}

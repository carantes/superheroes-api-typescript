import { Db, Cursor, FilterQuery, InsertOneWriteOpResult } from "mongodb";
import { Superhero } from "./model";

export interface DAOInterface<T> {
  getAll: (filter?: FilterQuery<T>) => Cursor<T>;
  getOne: (filter: FilterQuery<Superhero>) => Promise<T | null>;
  insertOne: (object: T) => Promise<InsertOneWriteOpResult<Superhero>>;
  drop: () => Promise<any>;
}

export class SuperheroesDAO implements DAOInterface<Superhero> {
  constructor(readonly db: Db) {}

  getAll = (filter?: FilterQuery<Superhero>): Cursor<Superhero> => {
    return this.db.collection("superheroes").find<Superhero>(filter);
  };

  getOne = (filter: FilterQuery<Superhero>): Promise<Superhero | null> => {
    return this.db.collection("superheroes").findOne<Superhero>(filter);
  };

  insertOne = (sh: Superhero): Promise<InsertOneWriteOpResult<Superhero>> => {
    return this.db.collection("superheroes").insertOne(sh);
  };

  drop = async (): Promise<any> => {
    try {
      return await this.db.collection("superheroes").drop();
    } catch (err) {
      if (err.message.match(/ns not found/)) {
        return null;
      }

      throw err;
    }
  };
}

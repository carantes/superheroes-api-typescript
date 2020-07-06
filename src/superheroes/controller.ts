import { SuperheroesServiceInterface } from "./service";
import { DAOInterface } from "./dao";
import { Superhero, SuperheroAlignment } from "./model";
import {
  SuperheroNotFoundException,
  SuperheroAlreadyExistsException,
} from "./exceptions";

export interface SuperheroesControllerInterface {
  readonly dao: DAOInterface<Superhero>;
  readonly service: SuperheroesServiceInterface;
  getAllSuperheroes: () => Promise<Superhero[]>;
  getSuperhero: (id: string) => Promise<Superhero>;
  createSuperhero: (name: string) => Promise<Superhero | null>;
  deleteSuperhero: (id: string) => Promise<boolean>;
}

export class SuperheroesController implements SuperheroesControllerInterface {
  constructor(
    readonly dao: DAOInterface<Superhero>,
    readonly service: SuperheroesServiceInterface,
  ) {}

  getAllSuperheroes = (): Promise<Superhero[]> => {
    return this.dao.getAll().toArray();
  };

  getSuperhero = async (id: string): Promise<Superhero> => {
    const sh = await this.dao.getOne({ _id: id });

    if (!sh) {
      throw new SuperheroNotFoundException(id);
    }

    return sh;
  };

  createSuperhero = async (name: string): Promise<Superhero | null> => {
    let sh = await this.dao.getOne({ name });

    if (sh) {
      throw new SuperheroAlreadyExistsException(name);
    }

    const result = await this.service.search(name);

    if (result.length === 0) {
      throw new SuperheroNotFoundException(name);
    }

    const { name: shName, biography, powerstats, work, image } = result[0];

    sh = new Superhero(
      shName,
      biography.fullName,
      biography.alignment.toUpperCase() === "GOOD"
        ? SuperheroAlignment.GOOD
        : SuperheroAlignment.BAD,
      parseInt(powerstats.intelligence),
      parseInt(powerstats.power),
      work.occupation,
      image.url,
      0,
    );

    await this.dao.insertOne(sh);

    return sh;
  };

  deleteSuperhero = async (id: string): Promise<boolean> => {
    const result = await this.dao.deleteOne({ _id: id });

    if (result.result.ok && result.deletedCount === 0) {
      throw new SuperheroNotFoundException(id);
    }

    return true;
  };
}

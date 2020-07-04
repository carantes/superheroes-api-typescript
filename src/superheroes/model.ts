import { v4 as uuidv4 } from "uuid";

export enum SuperheroAlignment {
  GOOD,
  BAD,
  NEUTRAL,
}

export class Superhero {
  public _id: any;

  constructor(
    readonly name: string,
    readonly fullName: string,
    readonly alignment: SuperheroAlignment,
    readonly intelligence: number,
    readonly power: number,
    readonly ocuppation: string,
    readonly imageURL: string,
    readonly totalRelatives: number,
  ) {
    this._id = uuidv4();
  }

  static fromObject(object: any): Superhero {
    return new Superhero(
      object.name,
      object.fullName,
      SuperheroAlignment.GOOD,
      object.intelligence,
      object.power,
      object.ocuppation,
      object.imageURL,
      object.totalRelatives,
    );
  }
}

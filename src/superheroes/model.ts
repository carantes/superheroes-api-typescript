import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export enum SuperheroAlignment {
  GOOD,
  BAD,
  NEUTRAL,
}

class BaseModel {
  public _id: any;
  public createdAt: string;
  public updatedAt: string;

  constructor() {
    this._id = uuidv4();
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
  }
}

export class Superhero extends BaseModel {
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
    super();
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

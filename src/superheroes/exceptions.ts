import { HttpException } from "../error";

export class SuperheroNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Superhero with id ${id} not found`);
  }
}

export class SuperheroAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(409, `Superhero with name ${name} already exists`);
  }
}

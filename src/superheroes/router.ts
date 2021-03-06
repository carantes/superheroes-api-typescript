import { Router } from "express";
import { RequestHandler, Request, Response, NextFunction } from "express";

import { SuperheroesControllerInterface } from "./controller";
interface SuperheroesRouterInterface {
  readonly controller: SuperheroesControllerInterface;
  getSuperheroHandler: RequestHandler;
  getAllSuperheroesHandler: RequestHandler;
  createSuperheroHandler: RequestHandler;
  deleteSuperheroHandler: RequestHandler;
}

export class SuperheroesRouter implements SuperheroesRouterInterface {
  private _router: Router;

  constructor(readonly controller: SuperheroesControllerInterface) {
    this._router = Router();
    this.router.get("/:id", this.getSuperheroHandler);
    this.router.get("/", this.getAllSuperheroesHandler);
    this.router.post("/", this.createSuperheroHandler);
    this.router.delete("/:id", this.deleteSuperheroHandler);
  }

  get router(): Router {
    return this._router;
  }

  getSuperheroHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const sh = await this.controller.getSuperhero(req.params.id);
      return res.status(200).json(sh);
    } catch (e) {
      return next(e);
    }
  };

  getAllSuperheroesHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const result = await this.controller.getAllSuperheroes();
    return res.status(200).json(result);
  };

  createSuperheroHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const sh = await this.controller.createSuperhero(req.body.name);
      return res.status(201).json(sh);
    } catch (e) {
      return next(e);
    }
  };

  deleteSuperheroHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      await this.controller.deleteSuperhero(req.params.id);
      return res.status(204).json();
    } catch (e) {
      return next(e);
    }
  };
}

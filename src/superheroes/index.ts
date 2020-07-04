import { Router } from "express";
import { Db } from "mongodb";

import { SuperheroesDAO } from "./dao";
import { SuperheroesService } from "./service";
import { SuperheroesController } from "./controller";
import { SuperheroesRouter } from "./router";
import { API_ENDPOINT } from "../config";

const superheroes = (db: Db): Router => {
  const dao = new SuperheroesDAO(db);
  const service = new SuperheroesService(API_ENDPOINT);
  const controller = new SuperheroesController(dao, service);
  const router = new SuperheroesRouter(controller);

  return router.router;
};

export default superheroes;

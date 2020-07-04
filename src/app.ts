import express from "express";
import bodyParser from "body-parser";

import connect from "./db";
import { errorMiddleware } from "./error";
import superheroes from "./superheroes";
import { MONGO_URI, MONGO_DBNAME } from "./config";

const app = express();

app.use(bodyParser.json());

app.get("/", (_, res) => res.send("Alive"));

connect(MONGO_URI).then((client) => {
  app.use("/superheroes", superheroes(client.db(MONGO_DBNAME)));
  app.use(errorMiddleware);
});

export default app;

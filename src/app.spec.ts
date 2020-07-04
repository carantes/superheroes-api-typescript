import request from "supertest";

import app from "./app";
import connect from "./db";
import { MONGO_URI, MONGO_DBNAME } from "./config";
import { SuperheroesDAO } from "./superheroes/dao";
import { Superhero } from "./superheroes/model";
import { Batman, Wolverine, Deadpool } from "./test/fixtures/superheroes.json";

describe("Healthcheck", () => {
  it("should return a response on healthcheck route", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Alive");
      });
  });
});

describe("Superheroes", () => {
  let dao: SuperheroesDAO;
  let sh1: Superhero, sh2: Superhero;

  beforeAll(async () => {
    const client = await connect(MONGO_URI);
    dao = new SuperheroesDAO(client.db(MONGO_DBNAME));
    await dao.drop();

    sh1 = Superhero.fromObject(Batman);
    sh2 = Superhero.fromObject(Wolverine);

    await dao.insertOne(sh1);
    await dao.insertOne(sh2);
  });

  afterAll(async () => {
    const client = await connect(MONGO_URI);
    dao = new SuperheroesDAO(client.db(MONGO_DBNAME));
    await dao.drop();
    client.close();
  });

  it("should get all superheroes", async () => {
    const res = await request(app).get("/superheroes").expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0]).toEqual(sh1);
    expect(res.body[1]).toEqual(sh2);
  });

  it("should get one superhero by id", async () => {
    const res = await request(app).get(`/superheroes/${sh1._id}`).expect(200);
    expect(res.body).toEqual(sh1);
  });

  it("should return 404 not found if get an unknown superhero", async () => {
    const res = await request(app).get("/superheroes/1").expect(404);
    expect(res.text).toEqual("Superhero with id 1 not found");
  });

  it("should return an error on create if superhero already exists", async () => {
    const res = await request(app)
      .post("/superheroes")
      .set("Accept", "application/json")
      .send({ name: sh1.name })
      .expect(409);

    expect(res.text).toEqual(`Superhero with name ${sh1.name} already exists`);
  });

  it("should create a superhero if not found on database", async () => {
    const { name } = Deadpool;
    const res = await request(app)
      .post("/superheroes")
      .set("Accept", "application/json")
      .send({ name })
      .expect(201);

    expect(res.body.name).toEqual(name);
  });

  // TODO
  // MOCK SERVICE
  // Create superhero - not found on service
  // Delete superhero
  // Readme
  // Docker
});

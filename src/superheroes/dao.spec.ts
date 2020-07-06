import connect from "../db";
import { Superhero } from "./model";
import { SuperheroesDAO } from "./dao";
import { MONGO_URI, MONGO_DBNAME } from "../config";
import { Batman, Wolverine } from "../test/fixtures/superheroes.json";

describe("Superheroes DAO", () => {
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
    const results = await dao.getAll().toArray();
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual(sh1);
    expect(results[1]).toEqual(sh2);
  });

  it("should get one superhero by name", async () => {
    const result = await dao.getOne({ name: sh1.name });
    expect(result).toEqual(sh1);
  });

  it("should delete one superhero by id", async () => {
    const result = await dao.deleteOne({ _id: sh1._id });
    expect(result.deletedCount).toEqual(1);
  });
});

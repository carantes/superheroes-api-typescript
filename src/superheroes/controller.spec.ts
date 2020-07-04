import { SuperheroesController } from "./controller";
import { DAOInterface } from "./dao";
import { Superhero } from "./model";
import { SuperheroesServiceInterface } from "./service";
import { Wolverine } from "../test/fixtures/api.json";
import { Batman } from "../test/fixtures/superheroes.json";

describe("Superheroes Controller", () => {
  let controller: SuperheroesController;
  let dao: DAOInterface<Superhero>;
  let service: SuperheroesServiceInterface;

  beforeEach(() => {
    dao = {
      getAll: jest.fn().mockReturnValue({ toArray: () => [] }),
      getOne: jest.fn(),
      insertOne: jest.fn(),
      drop: jest.fn(),
    };
    service = {
      endpoint: "http://bar.foo",
      search: jest.fn(),
    };
    controller = new SuperheroesController(dao, service);
  });

  describe("Get All superheroes", () => {
    it("should call getAll function on DAO", async () => {
      await controller.getAllSuperheroes();
      expect(dao.getAll).toHaveBeenCalled();
    });

    it("should return a list of superheroes", async () => {
      const result = await controller.getAllSuperheroes();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe("Get One superhero by id", () => {
    it("should call getOne function on DAO", async () => {
      const id = "1";
      dao.getOne = jest.fn().mockReturnValue(Batman);
      await controller.getSuperhero(id);
      expect(dao.getOne).toHaveBeenCalledWith({ _id: id });
    });

    it("should get one superhero by id", async () => {
      dao.getOne = jest.fn().mockReturnValue(Batman);
      const result = await controller.getSuperhero("1");
      expect(result).toEqual(Batman);
    });

    it("should throw an error if superhero doesnt exist", async () => {
      try {
        await controller.getSuperhero("1");
      } catch (err) {
        expect(err.message).toBe("Superhero with id 1 not found");
      }
    });
  });

  describe("Create superhero", () => {
    it("should call getOne function on DAO", async () => {
      service.search = jest.fn().mockReturnValue([Wolverine]);
      await controller.createSuperhero(Wolverine.name);
      expect(dao.getOne).toHaveBeenCalledWith({ name: Wolverine.name });
    });

    it("should call search function on Service", async () => {
      service.search = jest.fn().mockReturnValue([Wolverine]);
      await controller.createSuperhero(Wolverine.name);
      expect(service.search).toHaveBeenCalledWith(Wolverine.name);
    });

    it("should raise an exception if superhero not found on service", async () => {
      service.search = jest.fn().mockReturnValue([]);

      try {
        await controller.createSuperhero(Wolverine.name);
      } catch (err) {
        expect(err.message).toBe(`Superhero with id ${Wolverine.name} not found`);
      }
    });
  });
});

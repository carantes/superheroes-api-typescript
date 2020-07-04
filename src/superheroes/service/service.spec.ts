import axios from "axios";
import { mocked } from "ts-jest/utils";

import { SuperheroesService, APISearchResponseResult } from ".";
import mockData from "./mock.json";

jest.mock("axios");

describe("Superheroes Service", () => {
  const service = new SuperheroesService("http://bar.foo/1234");
  const mockedAxios = mocked(axios, true);

  describe("When service response is OK", () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue(mockData.success);
    });

    it("should call axios when search a superhero by name", async () => {
      await service.search("Wolverine");
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it("should parse response data from json", async () => {
      const result: APISearchResponseResult[] = await service.search("Wolverine");
      const sh = result[0];
      expect(sh.name).toBe("Wolverine");
      expect(sh.powerstats.intelligence).toBe("63");
      expect(sh.powerstats.power).toBe("89");
      expect(sh.biography.fullName).toBe("Logan");
      expect(sh.biography.alignment).toBe("good");
      expect(sh.work.occupation).toBe(
        "Adventurer, instructor, former bartender, bouncer, spy, government operative, mercenary, soldier, sailor, miner",
      );
      expect(sh.image.url).toBe(
        "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg",
      );
    });
  });

  describe("When superhero is not found", () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue(mockData.notFound);
    });

    it("should call axios when search a superhero by name", async () => {
      await service.search("NotASuperhero");
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it("should return an empty list", async () => {
      const result = await service.search("NotASuperhero");
      expect(result).toEqual([]);
    });
  });
});

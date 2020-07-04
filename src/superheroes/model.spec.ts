import { Superhero, SuperheroAlignment } from "./model";

describe("Superhero Model", () => {
  let sh: Superhero;

  beforeEach(() => {
    sh = new Superhero(
      "Batman",
      "Bruce Wayne",
      SuperheroAlignment.GOOD,
      100,
      47,
      "-",
      "http://www.hero.com/10441.jpg",
      10,
    );
  });

  it("should have a name", () => {
    expect(sh.name).toBe("Batman");
  });

  it("should have a full name", () => {
    expect(sh.fullName).toBe("Bruce Wayne");
  });

  it("should have an alignment", () => {
    expect(sh.alignment).toBe(SuperheroAlignment.GOOD);
  });

  it("should have intelligence", () => {
    expect(sh.intelligence).toBe(100);
  });

  it("should have power", () => {
    expect(sh.power).toBe(47);
  });

  it("should have an ocuppation", () => {
    expect(sh.ocuppation).toBe("-");
  });

  it("should have an image", () => {
    expect(sh.imageURL).toBe("http://www.hero.com/10441.jpg");
  });

  it("should have relatives", () => {
    expect(sh.totalRelatives).toBe(10);
  });
});

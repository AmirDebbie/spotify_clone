const request = require("supertest");
const app = require("../app");
const { Artist } = require("../models");

const mock = [{ name: "amir" }, { name: "shahar" }];

describe("testing artists endpoint", () => {

  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it("get all artist", async () => {
    await Artist.bulkCreate(mock);
    const { body } = await request(app).get("/artist");
    expect(body.length).toBe(2);
    expect(body[0].name).toBe("amir");
    expect(body[1].name).toBe("shahar");
  });

  it("post new artist", async () => {
    await request(app).post("/artist").send(mock[0]);
    const { body: artist1 } = await request(app).get("/artist");
    expect(artist1.length).toBe(1);
    expect(artist1[0].name).toBe("amir");
    await request(app).post("/artist").send(mock[1]);
    const { body: artist2 } = await request(app).get("/artist");
    expect(artist2.length).toBe(2);
    expect(artist2[1].name).toBe("shahar");
  });
});

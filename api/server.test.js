const request = require("supertest");

const server = require("./server");

const db = require("../data/dbConfig");

describe("server.js", () => {
  describe("index route", () => {
    it("should return status code 200 for get request to root route", async () => {
      const expectedCode = 200;
      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedCode);
    });

    it("it should return a JSON object from the root route", async () => {
      const body = { api: "up" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(body);
    });

    it("should return a JSON object from the root route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
  });

  describe("HTTP post method to /hobbits", () => {
    beforeEach(async () => {
      await db("hobbits").truncate();
    });

    it("should retrun status code 201 for successful insertion", async () => {
      const response = await request(server)
        .post("/hobbits")
        .send({ name: "sam" });

      expect(response.status).toEqual(201);
    });

    it(`should return a message saying 'You added a Hobbit to the Database'`, async () => {
      const response = await request(server).post("/hobbits").send({
        name: "sam",
      });

      expect(response.body.message).toBe(`You added a Hobbit to the Database`);
    });

    it("should add a hobbit to the database", async () => {
      const response = await request(server)
        .post("/hobbits")
        .send({ name: "sam" });

      const hobbitNumber = await db("hobbits").where({ name: "sam" });

      expect(hobbitNumber).toHaveLength(1);
    });
  });
});

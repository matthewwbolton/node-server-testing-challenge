const db = require("../data/dbConfig");

const Hobbits = require("../hobbits/hobbitsModel");

describe("hobbitsModel.js", () => {
  describe("insert()", () => {
    beforeEach(async () => {
      await db("hobbits").truncate();
    });

    it("should insert hobbits into the database", async () => {
      await Hobbits.insert({ name: "sam" });
      await Hobbits.insert({ name: "gaffer" });

      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(2);
    });
  });
});

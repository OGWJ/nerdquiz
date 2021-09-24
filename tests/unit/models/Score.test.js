const pg = require("pg");

const Score = require("../../../models/score.js");
const db = require("../../../dbConfig/init.js");

jest.mock("pg");

describe("Score", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("returns all scores on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}] });

      const all = await Score.all;

      expect(all.length).toEqual(2);
    });

    test("returns error notifying failure of retrieval on unsuccessful db query", async () => {
      try {
        jest.spyOn(db, "query").mockRejectedValueOnce(Error());
        await Score.all;
      } catch (err) {
        expect(err).toContain("Error retrieving scores:");
      }
    });
  });

  describe("create", () => {
    test("creates new score on successful db query", async () => {
      const scoreData = {
        username: "New",
        genre: "Entertainment: Comics",
        score: "10"
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...scoreData, id: 1 }] });
      const result = await Score.create(scoreData);
      expect(result).toHaveProperty("id");
    });

    test("returns error notifying failure of creation on unsuccessful db query", async () => {
      const scoreData = {
        username: "New",
        genre: "Entertainment: Comics",
        score: "10"
      };

      try {
        jest.spyOn(db, "query").mockRejectedValueOnce(Error());
        await Score.create(scoreData);
      } catch (err) {
        expect(err).toContain("Error creating score");
      }
    });
  });

  describe("findByGenre", () => {
    test("returns score by genre on successful db query", async () => {
      const scoreData = {
        username: "Claire",
        genre: "Entertainment: Comics",
        score: "60"
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [scoreData] });

      const result = await Score.findByGenre("Entertainment:%20Video%20Games");

      expect(result).toBeInstanceOf(Score);
    });

    test("returns error notifying failure of retrieval on unsuccessful db query", async () => {
      const scoreData = {
        username: "Claire",
        genre: "Entertainment: Comics",
        score: "60"
      };

      try {
        jest.spyOn(db, "query").mockRejectedValueOnce(Error());
        await Score.findByGenre("Entertainment:%20Video%20Games");
      } catch (err) {
        expect(err).toContain("Error retrieving score");
      }
    });
  });
});

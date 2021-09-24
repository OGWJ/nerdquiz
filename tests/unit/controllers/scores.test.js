const scoresController = require("../../../controllers/scores.js");
const Score = require("../../../models/score.js");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe("Scores Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("returns all scores with a 200 status code", async () => {
      jest
        .spyOn(Score, "all", "get")
        .mockResolvedValueOnce(["score1", "score2"]);

      await scoresController.index(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["score1", "score2"]);
    });

    test("returns error with a 500 status code", async () => {
      try {
        jest
          .spyOn(Score, "all", "get")
          .mockRejectedValueOnce("index error test");
        await scoresController.index(null, mockRes);
      } catch (err) {}

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ err: "index error test" })
      );
    });
  });

  describe("show", () => {
    test("returns a score by genre with a 200 status code", async () => {
      const testScoreData = {
        username: "Test",
        genre: "Comics",
        score: 20
      };
      jest
        .spyOn(Score, "findByGenre")
        .mockResolvedValueOnce(new Score(testScoreData));
      const mockReq = { params: { genre: "Comics" } };

      await scoresController.show(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Score(testScoreData));
    });

    test("returns error with a 404 status code", async () => {
      const mockReq = { params: { genre: "Comics" } };

      try {
        jest
          .spyOn(Score, "findByGenre")
          .mockRejectedValueOnce("show error test");
        await scoresController.show(mockReq, mockRes);
      } catch (err) {}

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ err: "show error test" })
      );
    });
  });

  describe("create", () => {
    test("returns a new score with a 201 status code", async () => {
      const newScoreData = {
        username: "Test",
        genre: "Comics",
        score: 20
      };
      jest
        .spyOn(Score, "create")
        .mockResolvedValueOnce(new Score(newScoreData));
      const mockReq = { body: newScoreData };

      await scoresController.create(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Score(newScoreData));
    });

    test("returns error with a 422 status code", async () => {
      const newScoreData = {
        username: "Test",
        genre: "Comics",
        score: 20
      };
      const mockReq = { body: newScoreData };

      try {
        jest.spyOn(Score, "create").mockRejectedValueOnce("create error test");
        await scoresController.create(mockReq, mockRes);
      } catch (err) {}

      expect(mockStatus).toHaveBeenCalledWith(422);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ err: "create error test" })
      );
    });
  });
});

describe("scores endpoints", () => {
  let api;

  beforeAll(() => {
    api = server.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  beforeEach(async () => {
    await resetTestDB();
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  test("responds to get / with 200 and welcome message", async () => {
    const res = await request(api).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Welcome to the Quiz Game!");
  });

  test("responds to get /scores with a list of all scores", async () => {
    const res = await request(api).get("/scores");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  test("returns scores by genre", async () => {
    const res = await request(api).get(`/scores/${genre}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body.username).toEqual("Test2");
    expect(res.body.genre).toEqual("Entertainment: Board Games");
    expect(res.body.score).toEqual(30);
  });

  test("responds to non existent paths with 404", async () => {
    const res = await request(api).get("/non");

    expect(res.statusCode).toEqual(404);
  });

  test("creates a new habit", async () => {
    const scoreData = {
      username: "Test3",
      genre: "Entertainment: Video Games",
      score: 40
    };

    const res = await request(api).post("/scores").send(scoreData);

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toEqual("Test3");
    expect(res.body.genre).toEqual("Entertainment: Video Games");
    expect(res.body.score).toEqual(40);
  });
});

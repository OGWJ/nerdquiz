const db = require("../dbConfig/init");

class Score {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.genre = data.genre;
    this.score = data.score;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM scores;`);
        let scores = result.rows.map((r) => new Score(r));
        res(scores);
      } catch (err) {
        rej(`Error retrieving scores: ${err}`);
      }
    });
  }

  static create(scoreData) {
    return new Promise(async (res, rej) => {
      try {
        const { username, genre, score } = scoreData;
        let result = await db.query(
          `INSERT INTO scores (username, genre, score) VALUES ($1, $2, $3) RETURNING *;`,
          [username, genre, score]
        );
        let newScore = new Score(result.rows[0]);
        res(newScore);
      } catch (err) {
        rej(`Error creating score: ${err}`);
      }
    });
  }

  static findByGenre(genre) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          `SELECT * FROM scores WHERE genre = $1 ORDER BY score DESC;`,
          [genre]
        );
        let scores = result.rows.map((r) => new Score(r));
        res(scores);
      } catch (err) {
        rej(`Error retrieving score: ${err}`);
      }
    });
  }
}

module.exports = Score;

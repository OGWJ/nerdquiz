const db = require("../dbConfig/init.js");

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
        let result = await db.query(
          `SELECT * FROM scores ORDER BY score DESC LIMIT 10;`
        );
        let scores = result.rows.map((r) => new Score(r));
        res(scores);
      } catch (err) {
        rej(`Error retrieving scores: ${err}`);
      }
    });
  }
  

  static create(username, genre, score) {
    return new Promise(async (res, rej) => {

      try {
        let currentUser = await db.query(
        `SELECT username FROM scores WHERE username = $1;`,[username]);
        
        if(currentUser.rows.length > 1){
          let result = await db.query(
            `UPDATE scores SET score = $2 WHERE score < $2 AND username = $1 RETURNING *;`,
            [username, score]);
            let newScore = await db.query(`SELECT * FROM scores WHERE username = $1`,[username])
            console.log("update", newScore)
            res(result);
        } else {
          let result = await db.query(
            `INSERT INTO scores (username, genre, score) VALUES ($1, $2, $3)  RETURNING *;`,
            [username, genre, score]);
            console.log("added", result.rows[0])
            let newScore = new Score(result.rows[0]);
            res(newScore);
         
        }
      }
      catch (err) {
      rej(`Error creating score: ${err}`)};
    })
  }
    
  

  static findByGenre(genre) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          `SELECT * FROM scores WHERE genre = $1 ORDER BY score DESC LIMIT 10;`,
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

module.exports = {Score};

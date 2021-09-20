class GameConfig {
  constructor(data) {
    this.roomId = data.roomId;
    this.genre = data.genre;
    this.difficulty = data.difficulty;
    this.admin = data.admin;
    this.users = [
      {
        name: admin,
        score: 0,
        complete: false
      }
    ];
    this.questions = questions;
    this.startGame = false;
  }
}

module.exports = { GameConfig };

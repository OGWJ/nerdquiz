class GameConfig {
  constructor(roomId, category, difficulty, admin) {
    this.roomId = roomId;
    this.category = category;
    this.difficulty = difficulty;
    this.admin = admin;
    this.users = [
      {
        name: this.roomId,
        score: 0
      }
    ];
    //this.startGame = false;
  }
  static gameData = [];

  static create(admin, category, difficulty) {
    const newGame = new GameConfig(admin, category, difficulty, admin);
    GameConfig.gameData.push(newGame);
    return newGame;
  }

  static joinUser(roomId, username) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    if (currentGame) {
      currentGame.users.push({ user: username, score: 0 });
    }
  }

  static getAllUsers(roomId) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    console.log(currentGame);
    return currentGame.users;
  }
}

module.exports = { GameConfig };

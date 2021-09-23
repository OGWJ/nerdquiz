class GameConfig {
  constructor(roomId, category, difficulty, admin) {
    this.roomId = roomId;
    this.category = category;
    this.difficulty = difficulty;
    this.admin = admin;
    this.users = [
      {
        user: this.roomId,
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
    return currentGame.users;
  }
  static deleteRoom(roomId) {
    console.log("Deleted Game");
    GameConfig.gameData = GameConfig.gameData.filter(
      (game) => game.roomId !== roomId
    );
  }

  static removeUser(roomId, user) {
    console.log("Removed User");

    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    //console.log(currentGame.users);
    if(currentGame){
    currentGame.users = currentGame.users.filter(
      (player) => player.name !== user
    );}
  }

  static getSettings(roomId) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    return currentGame;
  }
}

module.exports = { GameConfig };

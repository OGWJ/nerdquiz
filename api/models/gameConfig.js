class GameConfig {
  constructor(roomId, category, difficulty, admin, socketId) {
    this.roomId = roomId;
    this.category = category;
    this.difficulty = difficulty;
    this.admin = admin;
    this.users = [
      {
        socketId: this.socketId,
        user: this.roomId,
        score: 0
      }
    ];
    //this.startGame = false;
  }
  static gameData = [];

  static create(admin, category, difficulty, socketId) {
    const newGame = new GameConfig(
      admin,
      category,
      difficulty,
      admin,
      socketId
    );
    GameConfig.gameData.push(newGame);
    return newGame;
  }

  static joinUser(roomId, username, socketId) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    if (currentGame) {
      currentGame.users.push({ user: username, score: 0, socketId: socketId });
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
    console.log(currentGame.users);
    currentGame.users = currentGame.users.filter(
      (player) => player.name !== user
    );
  }

  static getSettings(roomId) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    return currentGame;
  }

  findUsernameBySocketId(socketId) {
    let findUser = this.users.find((user) => user.socketId === socketId);
    if (findUser) return findUser.username;
    return;
  }
}

module.exports = { GameConfig };

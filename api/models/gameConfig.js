class GameConfig {
  constructor(roomId, category, difficulty, admin, socketId) {
    this.roomId = roomId;
    this.category = category;
    this.difficulty = difficulty;
    this.admin = admin;
    this.users = [
      {
        socketId: socketId,
        user: this.roomId,
        score: 0
      }
    ];
    this.previousUser = this.users[0];
    this.questions = {};
    this.currentQuestionNumber = 0;
    // this.startGame = false;
  }
  static gameData = [];

  static getQuestionsForGame(roomId) {
    let currentGame = GameConfig.gameData.find(
      (game) => game.roomId === roomId
    );
    if (currentGame) {
      return currentGame.questions;
    }
  }

  static setQuestionsForGame(roomId, questions) {
    for (let i = 0; i < GameConfig.gameData.length; i++) {
      if (GameConfig.gameData[i].roomId === roomId) {
        GameConfig.gameData[i].questions = questions;
        return;
      }
    }
  }

  static getQuestionNumberForGame(roomId) {
    for (let i = 0; i < GameConfig.gameData.length; i++) {
      if (GameConfig.gameData[i].roomId === roomId) {
        return GameConfig.gameData[i].currentQuestionNumber;
      }
    }
  }

  static incrementQuestionNumberForGame(roomId) {
    for (let i = 0; i < GameConfig.gameData.length; i++) {
      if (GameConfig.gameData[i].roomId === roomId) {
        GameConfig.gameData[i].currentQuestionNumber = GameConfig.gameData[i].currentQuestionNumber + 1;
        return;
      }
    }
  }

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

  findUsernameBySocketId(socketId) {
    console.log(socketId);
    console.log(this.users);
    let findUser = this.users.find((user) => user.socketId == socketId);
    if (findUser) return findUser.user;
    return;
  }

  static getUserGoByRoomId(roomId) {
    console.log('getUserGoByRoomId called')
    let userGo;
    for (let i = 0; i < GameConfig.gameData.length; i++) {
      if (GameConfig.gameData[i].roomId === roomId) {
        // console.log('get users go', GameConfig.gameData[i].getUsersGo());
        userGo = GameConfig.gameData[i].getUsersGo();
        return userGo;
      }
    }
    return userGo;
  }

  getUsersGo() {
    let retval;
    console.log('getUsersGo called:', this.users.indexOf(this.previousUser));
    if (this.users.indexOf(this.previousUser) === this.users.length - 1) {
      retval = this.users[0];
    } else {
      retval = this.users[this.users.indexOf(this.previousUser) + 1];
    }
    this.previousUser = retval;
    return retval.user;
  }
}

module.exports = { GameConfig };

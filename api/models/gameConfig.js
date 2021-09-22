
class GameConfig {
  constructor(roomId) {
    this.roomId = roomId;
    // this.genre = data.genre;
    // this.difficulty = data.difficulty;
    // this.admin = data.admin;
    this.users = [
      {
        name: this.roomId,
        score: 0,
        
      }
    ];
    //this.startGame = false;
  }
  static gameData = [];

  static create(id, q, a) {
    const newGame = new GameConfig(id,{...q},{...a});
    GameConfig.gameData.push(newGame);
    return newGame;
}

  static joinUser(roomId, username){
    let currentGame = GameConfig.gameData.find(game => game.roomId === roomId)
    if(currentGame){ currentGame.users.push({user: username, score: 0}) }
  }

  static getAllUsers(roomId){
    let currentGame = GameConfig.gameData.find(game => game.roomId === roomId)
    return currentGame.users
  }

}




module.exports = { GameConfig };

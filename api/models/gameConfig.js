
let gameData =[];

class GameConfig {
  constructor(roomId, questions, answers) {
    this.roomId = roomId;
    // this.genre = data.genre;
    // this.difficulty = data.difficulty;
    // this.admin = data.admin;
    // this.users = [
    //   {
    //     name: admin,
    //     score: 0,
    //     complete: false
    //   }
    // ];
    this.questions = questions;
    this.answers = answers
    //this.startGame = false;
  }

  static create(id, q, a) {
    const newGame = new GameConfig(id,{...q},{...a});
    gameData.push(newGame);
    return newGame;
}

  // static get all(){
  //   const gameData = gameData.map((game) => new GameConfig(game));
  //   return gameData;
  // }
}




module.exports = { GameConfig };

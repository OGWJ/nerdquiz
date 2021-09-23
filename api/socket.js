const axios = require("axios");
const { GameConfig } = require("./models/gameConfig");
const { Score } = require("./models/score");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});
const he = require("he");

const port = 5001;

server.listen(port, () => {
  GameConfig.create("jessica", "board games", "hard");
  console.log(`Open for play on port ${port}!`);
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.emit("user connects", socket.id);

  socket.on("get room list", () => {
    let allGames = GameConfig.gameData;
    socket.emit("room list", allGames);
  });

  let settings;

  socket.on("create room", (roomSettings) => {
    console.log(`User ${socket.id} created a new room`);
    GameConfig.create(
      roomSettings.admin,
      roomSettings.category,
      roomSettings.difficulty,
      roomSettings.socketId
    );
    socket.join(roomSettings.admin);
    settings = roomSettings;
    socket.broadcast.emit("room created", roomSettings);
  });

  socket.on("user enter room", (roomSettings) => {
    console.log(`User ${socket.id} clicked entered room`);
    socket.join(roomSettings.roomId);
    //io.to(roomSettings.roomId).emit("user enter room", roomSettings);
    GameConfig.joinUser(
      roomSettings.roomId,
      roomSettings.username,
      roomSettings.socketId
    );
    let users = GameConfig.getAllUsers(roomSettings.roomId);
    roomSettings.users = users;
    socket.emit("user enter room", roomSettings);
  });

  socket.on("user exit room", (settings) => {
    
    if (settings.admin === settings.username) {
      GameConfig.deleteRoom(settings.admin);
      io.to(settings.admin).emit("quiz ended");
    } else {
      GameConfig.removeUser(settings.admin, settings.username);
      io.to(settings.admin).emit("user exited room", { user: settings.username });
    }
  });


  // ~~~~~~ GET QUESTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  async function getQuestions(admin, cat, diff) {
    let resp;
    if (cat === "Video Game") {
      const url = `https://opentdb.com/api.php?amount=50&category=15&difficulty=${diff.toLowerCase()}`;
      const { data } = await axios.get(url);
      if (data.response_code === 1) {
        console.log("no questions found");
      }
      retVal = data;
    } else if (cat === "Board Games") {
      const url = `https://opentdb.com/api.php?amount=50&category=16`;
      const { data } = await axios.get(url);
      if (data.response_code === 1) {
        console.log("no questions found");
      }
      resp = data;
    } else {
      const url = `https://opentdb.com/api.php?amount=50&category=29`;
      const { data } = await axios.get(url);
      if (data.response_code === 1) {
        console.log("no questions found");
      }
      resp = data;
    }

    //set q&a's
    let questions = resp.results.map((q) => q.question);
    let answers = resp.results.map((a) => [
      a.correct_answer,
      ...a.incorrect_answers
    ]);
    let correct_answers = resp.results.map((a) => a.correct_answer);

    return { questions, answers, correct_answers }
  }

  const sendQuestion = (admin) => {
    let numClients = GameConfig.getAllUsers(admin).length;
    let currentQuestion = GameConfig.getQuestionNumberForGame(admin);
    //check if all clients have answered ten questions
    if (currentQuestion <= numClients * 10 + 1) {
      //decode from HTML special characters, remove the quotation marks,
      let question = GameConfig.getQuestionsForGame(admin)
     
      question = he.decode(
        JSON.stringify(question.questions[currentQuestion]).slice(1, -1)
      );
      // let options = questionInfo.allAnswers[currentQuestion];
      let options = GameConfig.getQuestionsForGame(admin).answers[currentQuestion];

      let userTurnConfig = GameConfig.getUserGoByRoomId(admin);
      //send questions & answers
      // io.to(roomId).emit("question", question);
      // io.to(roomId).emit("options", options);
      let questionInfo = {
        questions: question,
        options: options,
        userTurn: userTurnConfig
      };
    
      io.to(admin).emit("question", questionInfo);
    } else {
      io.to(admin).emit("quiz ended", admin);
    }
  };

  // SET MODEL CURRENT QUESTION
  // SET MODEL QUESTIONS


  // GETTER 

  socket.on("answer", (e) => {
    console.log('received answer!', e.admin)
    console.log(e);
    let currentQuestion = GameConfig.getQuestionNumberForGame(e.admin);
    let allQuestions = GameConfig.getQuestionsForGame(e.admin);
    let correct_answer = allQuestions.correct_answers[currentQuestion];
    let info = GameConfig.getUserScore(e.username, e.admin)
    console.log(info)
    if (e.e === correct_answer) {
      GameConfig.incrementQuestionNumberForGame(e.admin);
      let score = GameConfig.updateUserScore(e.username, e.admin)
      console.log(score)
      // currentQuestion++;
      sendQuestion(e.admin);
      console.log("correct");
    } else {
      // currentQuestion++;
      GameConfig.incrementQuestionNumberForGame(e.admin);
      sendQuestion(e.admin);
      console.log("wrong");
    }
  })

  socket.on("user starts quiz", async (roomId) => {
  

    let questionSettings = GameConfig.getSettings(roomId);
    const questions = await getQuestions(
      questionSettings.admin,
      questionSettings.category,
      questionSettings.difficulty
    );
  
    GameConfig.setQuestionsForGame(roomId, questions)
    sendQuestion(roomId)

    io.to(roomId).emit("user started quiz");
  })


  //use room settings to request from the trivia API with user input

  // call function above

  //send the first question

  //listen for answers, move to the next question, call sendQuestion again


  //socket.on("user answer", (username, question, answer) => {
  //   io.to(roomSettings.admin)("user answer", username, question);
  //   console.log(`user answered question`);
  // });

  // socket.on("quiz ended", (roomId) => {
  //   io.emit("quiz ended", roomId);
  // });

  socket.on("disconnect", () => {
    // let userGame = GameConfig.gameData.find((game) => {
    //   return game.users.find((user) => {
    //     return user.socketId === socket.id;
    //   });
    // });
    let username;
    GameConfig.gameData.forEach((game) => {
      username = game.findUsernameBySocketId(socket.id);
      if (username) {
        GameConfig.removeUser(game.roomId, username);
        io.to(game.roomId).emit("quiz ended");
        console.log(`user ${socket.id} disconnected`);
        return;
      }
    });
  });
});

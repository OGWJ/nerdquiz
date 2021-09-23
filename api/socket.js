const axios = require("axios");
const { GameConfig } = require("./models/gameConfig");

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
    console.log(settings);
    if (settings.admin === settings.username) {
      GameConfig.deleteRoom(settings.admin);
      io.to(settings.admin).emit("quiz ended");
    } else {
      GameConfig.removeUser(settings.admin, settings.username);
      io.to(settings.admin).emit("user exit room", { user: settings.username });
    }
  });

  socket.on("user starts quiz", (roomId) => {
    console.log(`User ${socket.id} clicked start quiz`);

    io.to(roomId).emit("user started quiz");
    let questionSettings = GameConfig.getSettings(roomId);
    getQuestions(
      questionSettings.admin,
      questionSettings.category,
      questionSettings.difficulty
    );

    //use room settings to request from the trivia API with user input
    async function getQuestions(admin, cat, diff) {
      let retVal;
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
        retVal = data;
      } else {
        const url = `https://opentdb.com/api.php?amount=50&category=29`;
        const { data } = await axios.get(url);
        if (data.response_code === 1) {
          console.log("no questions found");
        }
        retVal = data;
      }

      //set q&a's
      let questions = retVal.results.map((q) => q.question);
      let answers = retVal.results.map((a) => [
        a.correct_answer,
        ...a.incorrect_answers
      ]);
      let correct_answers = retVal.results.map((a) => a.correct_answer);

      //send to function to take it turns and emit questions to the front end as accordingly
      selectQuestions(questions, answers, correct_answers, admin);
    }

    // call function above

    const selectQuestions = (
      allQuestions,
      allAnswers,
      correct_answers,
      admin
    ) => {
      // get length of client
      let numClients = GameConfig.getAllUsers(admin).length;

      console.log("clients " + numClients);
      let currentQuestion = 0;

      const sendQuestion = () => {
        //check if all clients have answered ten questions
        if (currentQuestion <= numClients * 10 + 1) {
          //decode from HTML special characters, remove the quotation marks,
          let question = he.decode(
            JSON.stringify(allQuestions[currentQuestion]).slice(1, -1)
          );
          let options = allAnswers[currentQuestion];

          let userTurnConfig = GameConfig.getUserGoByRoomId(roomId);
          console.log("userTurnConfig", userTurnConfig);
          //send questions & answers
          // io.to(roomId).emit("question", question);
          // io.to(roomId).emit("options", options);
          let questionInfo = {
            questions: question,
            options: options,
            userTurn: userTurnConfig
          };
          io.to(roomId).emit("question", questionInfo);
        } else {
          io.to(roomId).emit("quiz ended", roomId);
        }
      };
      //send the first question
      sendQuestion();

      //listen for answers, move to the next question, call sendQuestion again
      socket.on("answer", (e) => {
        //if it is equal to the correct answer
        if (e === correct_answers[currentQuestion]) {
          currentQuestion++;
          sendQuestion();
          console.log("correct");
        } else {
          currentQuestion++;
          sendQuestion();
          console.log("wrong");
        }
      });
    };
  });

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

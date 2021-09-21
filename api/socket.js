const axios = require('axios');
const { GameConfig } = require('./models/gameConfig');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

const port = 5001;

server.listen(port, () => {
  console.log(`Open for play on port ${port}!`);
});

io.on("connection", (socket) => {
  
  socket.on("create room", (roomSettings) => {
    socket.join(roomSettings.admin);
    io.emit("create room", roomSettings); 

    //use room settings to request from the trivia API with user input
    async function getQuestions(admin, cat, diff) {
      const url = `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff.toLowerCase()}`;
      const { data } = await axios.get(url);
      
      //set q&a's
      let questions = data.results.map(q => q.question)
      let answers = data.results.map(a => [a.correct_answer, ...a.incorrect_answers])
      let correct_answer = data.results.map(a => a.correct_answer)
      
      //emit Q&A to the front end
      io.emit("questions", (GameConfig.create(admin, questions, answers))) 
  }
  getQuestions(roomSettings.admin, roomSettings.category, roomSettings.difficulty)
});

  socket.on("user enter room", (roomSettings) => {
    socket.join(roomSettings.admin);
    io.to(roomSettings.admin).emit("user enter room");
  });

  socket.on("user answer", (username, question, answer) => {
    io.to(roomSettings.admin)("user answer", username, question);
    console.log(`user answered question`);
  });

  socket.on("quiz ended", (roomId) => {
    io.emit("quiz ended", roomId);
  });

  socket.on("disconnect", () => {
    io.emit("user exit room");
    console.log(`user disconnected`);
  });
});

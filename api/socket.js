const axios = require('axios');
const { GameConfig } = require('./models/gameConfig');
const {selectQuestions} = require('./controllers/helpers/index')
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
      const url = `https://opentdb.com/api.php?amount=50&category=${cat}&difficulty=${diff.toLowerCase()}`;
      let { data } = await axios.get(url);
      
      //set q&a's
      let questions = data.results.map(q => q.question)
      let answers = data.results.map(a => [a.correct_answer, ...a.incorrect_answers])
      let correct_answer = data.results.map(a => a.correct_answer)
      
      //send to function to take it turns and emit questions to the front end as accordingly
      selectQuestions(GameConfig.create(admin, questions, answers), correct_answer)
      }
  getQuestions(roomSettings.admin, roomSettings.category, roomSettings.difficulty)
  let clients = ["one", "two", "three"];

const selectQuestions = (qAndAs, correct_answer) =>{
    console.log(qAndAs)
    // get length of client
    let numClients = clients.length
    
    
    for(let qsAsked = 0; qsAsked < (numClients*10);qsAsked++){
       let question = (JSON.stringify(qAndAs.questions[qsAsked], JSON.stringify(qAndAs.answers[qsAsked])))
       console.log(correct_answer[qsAsked])
       socket.emit("question", question)
       socket.on("answer", (answer)=>{
         //if it is equal to the correct answer
         if(answer === correct_answer[qsAsked]){
           // add one to the score of that user (or however many points)
         }
        qsAsked++
       }       
       )}
  }
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



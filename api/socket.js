const axios = require('axios');
const { GameConfig } = require('./models/gameConfig');
const {selectQuestions} = require('./controllers/helpers/index')
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

let settings;

const port = 5001;

server.listen(port, () => {
  console.log(`Open for play on port ${port}!`);
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on("create room", (roomSettings) => {
    console.log(`User ${socket.id} created a new room`)
    socket.join(roomSettings.admin);
    io.emit("create room", roomSettings); 
    settings = roomSettings
  });


  socket.on("user enter room", (roomSettings) => {
    console.log(`User ${socket.id} clicked entered room`);
    socket.join(roomSettings.admin);
    io.to(roomSettings.admin).emit("user enter room");
  });

  socket.on("user start quiz", (roomId)=>{
    console.log(`User ${socket.id} clicked start quiz`);
    console.log(settings)
    io.to(roomId).emit("user start quiz");

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

      // call function above 
      getQuestions(settings.admin, settings.category, settings.difficulty)

      const selectQuestions = (allQuestions, correct_answer) =>{

        // get length of client
        let numClients = io.sockets.adapter.rooms.get(settings.admin).size
          
          //iterate over questions, making sure each client gets asked ten questions
        for(let currentQuestion = 0; currentQuestion < (numClients*10);currentQuestion++)
        {
          let question = (JSON.stringify(allQuestions.questions[currentQuestion], JSON.stringify(allQuestions.answers[currentQuestion])))
             console.log(question)
            socket.emit("question", question) 
            socket.on("answer", (answer)=>
             {
               //if it is equal to the correct answer
               if(answer === correct_answer[currentQuestion])
               {
                 // add one to the score of that user (or however many points)
               }
               //currentQuestion++  
            })
          }
        }
      

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



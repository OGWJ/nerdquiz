const axios = require('axios');
const { GameConfig } = require('./models/gameConfig');
const {selectQuestions} = require('./controllers/helpers/index')
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});
const he = require('he');

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
        console.log("clients " + numClients)
        let currentQuestion = 0;
          
        const sendQuestion = () =>{   
          
          //check if all clients have answered ten questions
            if(currentQuestion <= (numClients*10)){

          //decode from HTML special characters, remove the quotation marks, 
            let question = he.decode(JSON.stringify(allQuestions.questions[currentQuestion]).slice(1,-1))
            let options = allQuestions.answers[currentQuestion]
            
            //send questions & answers
              socket.emit("question", (question)) 
              socket.emit("options", options) 
              
             }
            }

            //send the first question
            sendQuestion()

            //listen for answers, move to the next question, call sendQuestion again
             socket.on("answer", (e)=>
             {
               console.log(e)
               //if it is equal to the correct answer
               if(e === correct_answer[currentQuestion])
               {
                  currentQuestion++ 
                  sendQuestion()
                  console.log("correct")
               }else {
                  currentQuestion++ 
                  sendQuestion()
                  console.log("wrong");
               }
               
             })
              

        }
  });

  //socket.on("user answer", (username, question, answer) => {
  //   io.to(roomSettings.admin)("user answer", username, question);
  //   console.log(`user answered question`);
  // });

  socket.on("quiz ended", (roomId) => {
    io.emit("quiz ended", roomId);
  });

  socket.on("disconnect", () => {
    io.emit("user exit room");
    console.log(`user disconnected`);
  });
});



// let questionNum = 0
// let count = 0
// if(count === 0){
//   count = 1
//   emit question[question num]

//   wait for the answer 
//     check answer
//     reset listener 
//   received you questionNum++
//   count = 0
// }
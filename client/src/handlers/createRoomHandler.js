import { socket } from "../service/socket";

export const createRoomHandler = (e) => {
  const settings = e.target;
  e.preventDefault();
  const roomSettings = {
    admin: localStorage.getItem("username"),
    category: settings[0].value,
    difficulty: settings[1].value
  };
  socket.emit("create room", roomSettings);
  socket.on("questions", (questions)=>{
    console.log(questions[0])
  })
  socket.on("answers", (answers)=>{
    console.log(answers[0])
  })
};

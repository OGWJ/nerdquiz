
import { socket } from "../service/socket";

export const createRoomHandler = (e) => {
  
  const settings = e.target;
  e.preventDefault();
  const roomSettings = {
    admin: localStorage.getItem("username"),
    category: settings[0].value,
    difficulty: settings[1].value
  };
  // const roomSettings = {
  //   admin: "admin",
  //   category: 15,
  //   difficulty: "easy"
  // };
  
  socket.emit("create room", roomSettings);
  


};

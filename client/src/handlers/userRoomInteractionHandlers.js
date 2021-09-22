import { socket } from "../service/socket";

export const userEntersRoomHandler = (roomId) => {
  let roomSettings = {
    username: localStorage.getItem("username"),
    roomId: roomId
  };
  socket.emit("user enter room", roomSettings);
};

export const userExitsRoomHandler = (admin) => {
  socket.emit("user exit room", {username: localStorage.getItem("username"), admin: admin});
  console.log("user exited")
};

export const userStartsQuizHandler = (roomId) => {
  console.log("userStartsQuizHandler is called");
  socket.emit("user starts quiz", roomId);
};

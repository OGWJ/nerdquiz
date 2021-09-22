import { socket } from "../service/socket";

export const userEntersRoomHandler = (roomId) => {
  let roomSettings = {
    username: localStorage.getItem("username"),
    roomId: roomId
  };
  socket.emit("user enter room", roomSettings);
};

export const userExitsRoomHandler = () => {
  socket.emit("user exit room", localStorage.getItem("username"));
};

export const userStartsQuizHandler = (roomId) => {
  console.log("userStartsQuizHandler is called");
  socket.emit("user start quiz", roomId);
};

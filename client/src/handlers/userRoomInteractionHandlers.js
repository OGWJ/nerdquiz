import { GameConfig } from "../../../api/models/gameConfig";
import { socket } from "../service/socket";

export const userEntersRoomHandler = (roomId, username) => {
  let roomSettings = {
    username: username,
    roomId: roomId
  };
  socket.emit("user enter room", roomSettings);
};

export const userExitsRoomHandler = (admin, username) => {
  socket.emit("user exit room", { username: username, admin: admin });
  console.log("user exited");
};

export const userStartsQuizHandler = (roomId) => {
  console.log("userStartsQuizHandler is called");
  socket.emit("user starts quiz", roomId);
};

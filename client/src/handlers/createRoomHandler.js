import { socket } from "../service/socket";

export const createRoomHandler = (e, username) => {
  const settings = e.target;
  e.preventDefault();
  const roomSettings = {
    admin: username,
    category: settings[0].value,
    difficulty: settings[1].value
  };

  socket.emit("create room", roomSettings);
  return roomSettings;
};

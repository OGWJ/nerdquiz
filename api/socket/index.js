const { GameConfig } = require("../models/GameConfig");
const { io } = require("../socket");

function socketInit(socket) {
  socket.on("disconnect", () => console.log("user disconnected"));

  socket.on("create room", ({ room, genre, difficulty, admin, questions }) => {
    const state = new GameConfig(genre, difficulty, admin, room, questions);
    socket.join(room);
    io.to(room).emit("change room state", state);
  });

  socket.on("join room", ({ room, username }) => {
    console.log(`${username} joined room ${room}`);
    socket.join(room);
    socket.to(room).emit(`${username} joining waiting room`, username);
  });

  socket.on("send room state to users", (state) => {
    io.to(state.roomId).emit("change room state", state);
  });

  socket.on("update user score", ({ room, user, score }) => {
    socket.to(room).emit("update score of other user", { user, score });
  });

  socket.on("complete game", ({ room, user }) => {
    io.to(room).emit("update completion", user);
  });
}

module.exports = { socketInit };

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

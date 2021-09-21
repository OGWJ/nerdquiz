const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Open for play on port ${port}!`);
});

io.on("connection", (socket) => {
  socket.on("create room", (roomId, roomSettings) => {
    socket.join(roomId);
    console.log("created room", roomId);
    io.emit("create room", roomSettings);
  });

  socket.on("user enter room", (roomId) => {
    socket.join(roomId);
    console.log("Number of players:", playerCount);
    io.emit("user enter room", roomId);
  });

  socket.on("user answer", (username, question, answer) => {
    io.emit("user answer", username, question, answer);
    console.log(`${username} answered ${question}`);
  });

  socket.on("quiz ended", (roomId) => {
    io.emit("quiz ended", roomId);
  });

  socket.on("disconnect", () => {
    io.emit("user exit room");
    console.log(`${username} disconnected`);
  });
});

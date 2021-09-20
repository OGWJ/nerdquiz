const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
}); // integrate our http server with a new instance of socket.io

// socket connection will go here

app.use(express.static(path.join(__dirname, "client")));

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Open for play on port ${port}!`);
});

// Handle a socket connection request from web client
const connections = [null, null];

io.on("connection", (socket) => {
  console.log("'Ello, who's this we got here?"); // runs when client first connects

  // Find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  // Tell the connecting client what player number they are
  socket.emit("player-number", playerIndex);

  console.log(`Player ${playerIndex} has connected`);

  // Ignore player 3
  if (playerIndex === -1) return;

  connections[playerIndex] = false;

  // Tell eveyone what player number just connected
  socket.broadcast.emit("player-connection", playerIndex);

  // Handle Diconnect
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} disconnected`);
    connections[playerIndex] = null;
    //Tell everyone what player numbe just disconnected
    socket.broadcast.emit("player-connection", playerIndex);
  });

  // On Ready
  socket.on("player-ready", () => {
    socket.broadcast.emit("enemy-ready", playerIndex);
    connections[playerIndex] = true;
  });

  // Check player connections
  socket.on("check-players", () => {
    const players = [];
    for (const i in connections) {
      connections[i] === null
        ? players.push({ connected: false, ready: false })
        : players.push({ connected: true, ready: connections[i] });
    }
    socket.emit("check-players", players);

    // Timeout connection
    setTimeout(() => {
      connections[playerIndex] = null;
      socket.emit("timeout");
      socket.disconnect();
    }, 600000); // 10 minute limit per player
  });
});

module.exports = { io };

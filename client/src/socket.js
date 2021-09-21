// Multiplayer
function startMultiPlayer() {
  gameMode = "multiPlayer";

  const socket = io();

  // Get your player number
  socket.on("player-number", (num) => {
    if (num === -1) {
      infoDisplay.innerHTML = "Sorry, the server is full";
    } else {
      playerNum = parseInt(num);
      if (playerNum === 1) currentPlayer = "Player 2";

      console.log(playerNum);

      // Get other player status
      socket.emit("check-players");
    }
  });

  // Another player has connected or disconnected
  socket.on("player-connection", (num) => {
    console.log(`Player number ${num} has connected or disconnected`);
    playerConnectedOrDisconnected(num);
  });

  // On Player 2 ready
  socket.on("player-2-ready", (num) => {
    enemyReady = true;
    playerReady(num);
    if (ready) playGameMulti(socket);
  });

  // Check player status
  socket.on("check-players", (players) => {
    players.forEach((p, i) => {
      if (p.connected) playerConnectedOrDisconnected(i);
      if (p.ready) {
        playerReady(i);
        if (i !== playerReady) enemyReady = true;
      }
    });
  });

  // On Timeout
  socket.on("timeout", () => {
    infoDisplay.innerHTML = "You have reached the 10 minute limit";
  });

  function playerConnectedOrDisconnected(num) {
    let player = `.p${parseInt(num) + 1}`;
    document
      .querySelector(`${player} .connected span`)
      .classList.toggle("green");
    if (parseInt(num) === playerNum)
      document.querySelector(player).style.fontWeight = "bold";
  }
}

function startSinglePlayer() {
  gameMode = "singlePlayer";

  startButton.addEventListener("click", playGameSingle);
}

// function for playGameMulti
// function for playGameMulti

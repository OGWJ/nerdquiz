import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./layout";
import { socket } from "./service/socket";
import {
  CreateRoomPage,
  HomePage,
  LandingPage,
  WaitingRoomPage,
  QuizPage,
  QuizFinishedPage,
  LeaderboardPage
} from "./pages";

import "./style.css";
import { GameContext, GameStateTypes } from "./models/GameStateTypes";

function App() {
  const [gameSettings, setGameSettings] = useState({});
  const [gameState, setGameState] = useState(GameStateTypes.LANDING);
  const [username, setUsername] = useState("");
  const [socketId, setSocketId] = useState();

  socket.on("user connects", (Id) => {
    setSocketId(Id);
  });

  return (
    <div className="vh-100">
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <GameContext.Provider
              value={{
                getState: gameState,
                setState: setGameState,
                gameSettings: gameSettings,
                setGameSettings: setGameSettings,
                username: username,
                setUsername: setUsername,
                socketId: socketId
              }}
            >
              <GamePage />
            </GameContext.Provider>
          </Route>

          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

const GamePage = () => {
  const game = useContext(GameContext);
  switch (game.getState) {
    case "LANDING":
      return <LandingPage />;
    case "HOME":
      return <HomePage />;
    case "CREATE_ROOM":
      return <CreateRoomPage />;
    case "WAITING_ROOM":
      return <WaitingRoomPage />;
    case "QUIZ":
      return <QuizPage />;
    case "QUIZ_FINISHED":
      return <QuizFinishedPage />;
    default:
      return <h1>Error</h1>;
  }
};

export default App;

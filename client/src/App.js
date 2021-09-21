import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./layout";
import {
  CreateRoomPage,
  HomePage,
  LandingPage,
  WaitingRoomPage,
  QuizPage,
  QuizFinishedPage,
  LeaderboardPage
} from "./pages";

import './style.css';
import './colors.css';
import { GameContext, GameStateTypes } from './models/GameStateTypes';

function App() {

  const [gameState, setGameState] = useState(GameStateTypes.LANDING);

  return (

    <div className='vh-100'>
      <Header />
      <main>

        <Switch>

          <Route exact path="/">
            <GameContext.Provider value={{ getState: gameState, setState: setGameState }}>
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
    case 'LANDING':
      // return <LandingPage />;
      // DEBUG
      return <HomePage />
    case 'HOME':
      return <HomePage />;
    case 'CREATE_ROOM':
      return <CreateRoomPage />;
    case 'WAITING_ROOM':
      return <WaitingRoomPage />;
    case 'QUIZ':
      return <QuizPage />;
    case 'QUIZ_FINISHED':
      return <QuizFinishedPage />;
    default:
      return <h1>Error</h1>;
  }
}

export default App;

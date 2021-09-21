import React, { useContext } from "react";
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
import GameStateTypes from './models/GameStateTypes';
const GameContext = React.createContext(null);

function App() {

  return (

    <div className='vh-100'>
      <Header />
      <main>

        <Switch>

          <Route exact path="/">
            <GameContext.Provider value={GameStateTypes.LANDING}>
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
  const gameState = useContext(GameContext);
  switch (gameState) {
    case 'LANDING':
      return <LandingPage />;
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
  }
}

export default App;

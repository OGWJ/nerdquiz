import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./layout";
import {
  CreateRoomPage,
  HomePage,
  LandingPage,
  WaitingRoomPage,
  QuizPage,
  LeaderboardPage
} from "./pages";

import './style.css';

function App() {
  return (

    <div className='vh-100'>
      <Header />
      <main>

        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/home/:username">
            <HomePage />
          </Route>

          <Route path="/create-room">
            <CreateRoomPage />
          </Route>

          <Route path="/waiting-room/:roomId">
            <WaitingRoomPage />
          </Route>

          <Route path="/quiz/:roomId">
            <QuizPage />
          </Route>

          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>

        </Switch>

      </main>
    </div>
  );
}

export default App;

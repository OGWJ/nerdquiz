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

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/landing-page/:username">
          <LandingPage />
        </Route>
        <Route path="/create-room">
          <CreateRoomPage />
        </Route>
        <Route path="/waiting-room/:room-id">
          <WaitingRoomPage />
        </Route>
        <Route path="/quiz/:room-id">
          <QuizPage />
        </Route>
        <Route path="/leaderboard">
          <LeaderboardPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

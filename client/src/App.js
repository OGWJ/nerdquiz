import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./layout";
import { Home } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;

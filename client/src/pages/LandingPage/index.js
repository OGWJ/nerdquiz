import React, { useContext } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";

import "./style.css";

const LandingPage = () => {
  const game = useContext(GameContext);

  const usernameSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    game.setUsername(name);
    game.setState(GameStateTypes.HOME);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="vh-100 d-flex flex-column justify-content-center">
        <form name="landingpage-form" onSubmit={usernameSubmitHandler}>
          <label htmlFor="username-input" style={{ visibility: "hidden" }}>
            Enter your name
          </label>
          <br />
          <input
            id="username-input"
            placeholder="Enter your username"
            autoFocus
            required
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
// import { usernameSubmitHandler } from "../../handlers/usernameSubmitHandler";
import { useHistory } from "react-router-dom";

import "./style.css";

const LandingPage = () => {
  const history = useHistory();
  const usernameSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    localStorage.setItem("username", name);
    history.push(`/home/${name}`);
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
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LandingPage;

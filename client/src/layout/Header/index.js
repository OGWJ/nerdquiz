import React from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

const Header = () => {
  const location = useLocation();
  let navLink;

  if (location.pathname === "/leaderboard") {
    navLink = <a href="http://localhost:8080">Back to Home</a>;
  } else {
    navLink = <a href="http://localhost:8080/leaderboard">Leaderboard</a>;
  }

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            Nerd Quiz
          </a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>{navLink}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

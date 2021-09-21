import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./style.css";

const Header = () => {
  const location = useLocation();
  let navLink;

  if (location.pathname === "/leaderboard") {
    navLink = <NavLink activeClassName="home-link" to="/home/:username">Back to Home</NavLink>;
  } else {
    navLink = <NavLink activeClassName="active" to="/leaderboard">Leaderboard</NavLink>;
    //  navLink = <a href="http://localhost:8080/leaderboard">Leaderboard</a>; 
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

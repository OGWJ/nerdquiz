import React from "react";
import { useLocation, NavLink } from "react-router-dom";
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
          <NavLink to='' className="navbar-brand">
            Nerd Quiz
          </NavLink>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>{navLink}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

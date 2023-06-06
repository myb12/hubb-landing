import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="header">
      <Link to="/">Logo</Link>
      <ul>
        <li>
          <Link to="/comunity">Comunity</Link>
        </li>
        <li>
          <Link to="/healing">Healing</Link>
        </li>
        <li>
          <Link to="/festival">Festival</Link>
        </li>
        <li>
          <div>Burger</div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

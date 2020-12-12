import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul className="main-nav">
      <li style={{ float: "left" }}>
        <Link
          className="li-link"
          to="/"
          style={{ textDecoration: "none", color: "black" }}
        >
          Keikaku
        </Link>
      </li>
      <li style={{ float: "left" }}>
        <Link
          className="li-link"
          to="/season/current"
          style={{ textDecoration: "none", color: "black" }}
        >
          Season
        </Link>
      </li>
      <li style={{ float: "right", padding: "15px 15px 15px 15px" }}>
        <input type="text" placeholder="Search for Anime" />
      </li>
    </ul>
  );
};

export default Header;

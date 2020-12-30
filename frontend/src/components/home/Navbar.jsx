import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="title">THE TIMES</h1>
      <div className="nav">
        <span>
          <Link className="link" to="/writer">
            Post
          </Link>
        </span>
        <span>about</span>
        <span>
          <Link to="/login" className="link">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

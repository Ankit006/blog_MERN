import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
export default function Navbar({ profileImage }) {
  return (
    <div className="navbar">
      <h1 className="title">THE STORY</h1>
      <div className="nav">
        <span>
          <Link className="link" to="/writer">
            Post
          </Link>
        </span>
        <span>about</span>
        {profileImage === "" ? (
          <span>
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        ) : (
          <img className="profileImage" src={profileImage} alt="profileImage" />
        )}
        {/* <Dropdown /> */}
      </div>
    </div>
  );
}

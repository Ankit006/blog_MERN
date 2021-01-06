import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
export default function Navbar({
  profileImage,
  logout,
  dropDown,
  showDropDown,
}) {
  return (
    <div className="navbar">
      <h1 className="title">THE STORY</h1>
      <div className="nav">
        <span className="nav_items">
          <Link className="link" to="/writer">
            Post
          </Link>
        </span>
        {profileImage === "" ? (
          <span className="nav_items">
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        ) : (
          <img
            onClick={showDropDown}
            className="profileImage"
            src={profileImage}
            alt="profileImage"
          />
        )}
        <Dropdown logout={logout} showDropDown={dropDown} />
      </div>
    </div>
  );
}

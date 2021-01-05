import React from "react";
import { Link } from "react-router-dom";
export default function Dropdown({ showDropDown, logout }) {
  return (
    <div style={{ display: showDropDown }} className="dropdown">
      <div className="dropdown_items">
        <Link className="link" to="/writer">
          Post
        </Link>
      </div>
      <div className="dropdown_items">
        <Link to="/account" className="link">
          <p>Account</p>
        </Link>
      </div>
      <div className="dropdown_items">
        <p>Dark Mode</p>
      </div>
      <div onClick={logout} className="dropdown_items">
        <p>Logout</p>
      </div>
    </div>
  );
}

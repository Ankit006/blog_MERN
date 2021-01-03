import React from "react";
import { Link } from "react-router-dom";

export default function Login({
  username,
  userPassword,
  usernameHandler,
  passwordHandler,
  submitHandler,
  required,
  error,
}) {
  return (
    <div className="login">
      <div>
        <p className="input_label">username</p>
        <input
          type="text"
          className="input_field"
          value={username}
          onChange={usernameHandler}
          required={required}
          placeholder="Your username"
        />
      </div>
      <div>
        <p className="input_label">password</p>
        <input
          className="input_field"
          type="password"
          value={userPassword}
          onChange={passwordHandler}
          placeholder="Minimum 8 Characters"
          required={required}
        />
      </div>
      <p className="error">{error}</p>
      <button className="submit" type="submit" onClick={submitHandler}>
        Submit
      </button>
      <p className="account">
        don't have an account?
        <Link to="signup" className="link">
          <span className="link_to"> SignUp</span>
        </Link>
      </p>
    </div>
  );
}

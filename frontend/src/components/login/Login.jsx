import React from "react";
import { Link } from "react-router-dom";

export default function Login({
  username,
  userPassword,
  usernameHandler,
  passwordHandler,
  submitHandler,
}) {
  return (
    <div>
      <p>username</p>
      <input type="text" value={username} onChange={usernameHandler} />
      <p>password</p>
      <input type="password" value={userPassword} onChange={passwordHandler} />
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
      <p>
        don't have an account?
        <Link to="signup" className="link">
          SignUp
        </Link>
      </p>
    </div>
  );
}

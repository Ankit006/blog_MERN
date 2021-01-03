import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/login/Login";
import { connect } from "react-redux";
import authData from "../auth.js";
import axios from "axios";

function LoginScreen({ dispatch, username, password }) {
  const [error, setError] = useState("");
  const [required, setRequired] = useState(true);
  let history = useHistory();

  const usernameHandler = (event) => {
    dispatch({ type: "LOGIN_USERNAME", payload: event.target.value });
  };
  const passwordHandler = (event) => {
    dispatch({ type: "LOGIN_PASSWORD", payload: event.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setRequired(true);
      setError("Login information is required");
    } else {
      setRequired(false);
      const res = await axios.post("/api/login", {
        username: username,
        password: password,
      });
      if (res.data.error) {
        setError("username or password is incorrect");
      } else {
        setError("");
        const data = res.data;
        authData.accessToken = data.accessToken;
        history.goBack();
      }
    }
  };

  return (
    <div>
      <Login
        username={username}
        passwordHandler={passwordHandler}
        usernameHandler={usernameHandler}
        userPassword={password}
        submitHandler={submitData}
        error={error}
        required={required}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.login.username,
    password: state.login.password,
  };
}

export default connect(mapStateToProps)(LoginScreen);

import React from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/login/Login";
import { connect } from "react-redux";
import authData from "../auth.js";
import axios from "axios";

function LoginScreen({ dispatch, username, password }) {
  let history = useHistory();

  const usernameHandler = (event) => {
    dispatch({ type: "LOGIN_USERNAME", payload: event.target.value });
  };
  const passwordHandler = (event) => {
    dispatch({ type: "LOGIN_PASSWORD", payload: event.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/login", {
      username: username,
      password: password,
    });
    const data = res.data;
    authData.accessToken = data.accessToken;
    history.goBack();
  };

  return (
    <div>
      <Login
        username={username}
        passwordHandler={passwordHandler}
        usernameHandler={usernameHandler}
        userPassword={password}
        submitHandler={submitData}
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

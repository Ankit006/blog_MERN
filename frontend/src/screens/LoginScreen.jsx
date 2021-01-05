import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/login/Login";
import fetchLoading from "../loadingScreen/fetch.svg";
import { connect } from "react-redux";
import axios from "axios";

function LoginScreen({ dispatch, username, password }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [required, setRequired] = useState(true);
  let history = useHistory();

  const usernameHandler = (event) => {
    dispatch({ type: "LOGIN_USERNAME", payload: event.target.value });
  };
  const passwordHandler = (event) => {
    dispatch({ type: "LOGIN_PASSWORD", payload: event.target.value });
  };

  const submitData = async (e) => {
    setLoading(true);
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
        setLoading(false);
        setError("username or password is incorrect");
      } else {
        setError("");
        dispatch({ type: "SAVE_TOKEN_SUCCESS", payload: res.data.accessToken });
        if (res.data.profileImage) {
          dispatch({
            type: "PROFILE_IMAGE_SUCCESS",
            payload: res.data.profileImage,
          });
        }
        setLoading(false);
        history.goBack();
      }
    }
  };

  return (
    <div>
      {loading === true ? (
        <div className="fetchLoading">
          <img src={fetchLoading} alt="fetchLoading" />
        </div>
      ) : null}
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

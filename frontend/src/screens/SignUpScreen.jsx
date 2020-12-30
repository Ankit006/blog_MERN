import React, { useState } from "react";
import SignUp from "../components/signUp/SingUp";
import axios from "axios";
import { connect } from "react-redux";
import auth from "../auth.js";

function SignUpScreen({
  dispatch,
  username,
  email,
  password,
  confirmPassword,
  confirmPasswordError,
}) {
  const [image, setImage] = useState();
  const usernameHandler = (event) => {
    dispatch({ type: "SIGNUP_USERNAME", payload: event.target.value });
  };

  const emailHandler = (event) => {
    dispatch({ type: "SIGNUP_EMAIL", payload: event.target.value });
  };

  const passwordHandler = (event) => {
    dispatch({ type: "SIGNUP_PASSWORD", payload: event.target.value });
  };
  const confirmPasswordHandler = (event) => {
    dispatch({ type: "SIGNUP_CONFIRM_PASSWORD", payload: event.target.value });
  };
  const handleProfileImage = (event) => {
    setImage(event.target.files[0]);
  };
  const checkPasswordMatch = () => {
    password.includes(confirmPassword)
      ? dispatch({
          type: "CONFIRM_PASSWORD_ERROR",
          payload: "",
        })
      : dispatch({
          type: "CONFIRM_PASSWORD_ERROR",
          payload: "Password Doesn't Match",
        });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res1 = await axios.post("/api/signup", {
      username: username,
      email: email,
      password: password,
    });
    if (!res1.data.error) {
      auth.accessToken = res1.data.accessToken;
    }
    const data = new FormData();
    data.append("profile", image);
    const res2 = await axios.post("/api/uploadProfileImage", data);
    console.log(res2);
  };

  return (
    <div>
      <SignUp
        username={username}
        usernameHandler={usernameHandler}
        email={email}
        emailHandler={emailHandler}
        password={password}
        passwordHandler={passwordHandler}
        confirmPassword={confirmPassword}
        confirmPasswordHandler={confirmPasswordHandler}
        submitHandler={submitHandler}
        confirmPasswordError={confirmPasswordError}
        handleProfileImage={handleProfileImage}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.signup.username,
    email: state.signup.email,
    password: state.signup.password,
    confirmPassword: state.signup.confirmPassword,
    confirmPasswordError: state.signup.confirmPasswordError,
  };
}

export default connect(mapStateToProps)(SignUpScreen);

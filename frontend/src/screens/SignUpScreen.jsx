import React, { useState } from "react";
import SignUp from "../components/signUp/SingUp";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import auth from "../auth.js";

function SignUpScreen({
  dispatch,
  username,
  email,
  password,
  confirmPassword,
}) {
  const history = useHistory();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [required, setRequired] = useState(false);
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
    if (password.includes(event.target.value)) {
      dispatch({
        type: "SIGNUP_CONFIRM_PASSWORD",
        payload: event.target.value,
      });
      setError("");
    } else {
      setError("Password doesn't match");
    }
  };
  const handleProfileImage = (event) => {
    setImage(event.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setRequired(true);
    } else {
      setRequired(false);
      const res1 = await axios.post("/api/signup", {
        username: username,
        email: email,
        password: password,
      });
      if (!res1.data.error) {
        auth.accessToken = res1.data.accessToken;
        if (image !== "") {
          const data = new FormData();
          data.append("profile", image);
          const res2 = await axios.post("/api/uploadProfileImage", data, {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          if (res2.data.error) {
            setError("issue while uploading your image,try again later");
          }
        }
        history.push("/");
      } else {
        if (res1.data.error.email) {
          setError("An account in this email already exist");
        } else {
          setError("There is an issue while creating your account");
        }
      }
    }
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
        handleProfileImage={handleProfileImage}
        imageName={image.name}
        required={required}
        error={error}
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
  };
}

export default connect(mapStateToProps)(SignUpScreen);

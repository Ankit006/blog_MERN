import React, { useState } from "react";
import SignUp from "../components/signUp/SingUp";
import axios from "axios";
import fetchLoading from "../loadingScreen/fetch.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function SignUpScreen({
  dispatch,
  username,
  email,
  password,
  confirmPassword,
}) {
  // local states
  const history = useHistory(); // after signUp useHistory will help us to go back to our homepage
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(""); // to set the files data when user upload his profile image
  const [error, setError] = useState(""); // set  all the error data
  const [required, setRequired] = useState(false); // require if user didn't fill any input area

  // username handler for set username to redux store
  const usernameHandler = (event) => {
    dispatch({ type: "SIGNUP_USERNAME", payload: event.target.value });
  };
  // email handler to set username to redux store
  const emailHandler = (event) => {
    dispatch({ type: "SIGNUP_EMAIL", payload: event.target.value });
  };
  // password handler to set password to redux store
  const passwordHandler = (event) => {
    dispatch({ type: "SIGNUP_PASSWORD", payload: event.target.value });
  };
  // confirmPassword handler to set password to redux store
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

  // for set the profile to image state
  const handleProfileImage = (event) => {
    setImage(event.target.files[0]);
  };

  // submit signUpdata
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    // if there is any black input , there we will set required to true
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setRequired(true);
    } else {
      setRequired(false); // else we set required to false

      // first we will post our data to signUp api
      const res1 = await axios.post("/api/signup", {
        username: username,
        email: email,
        password: password,
      });
      // then we will check if response contain error
      // if not than we will dispatch action for save token
      if (!res1.data.error) {
        dispatch({
          type: "SAVE_TOKEN_SUCCESS",
          payload: res1.data.accessToken,
        });
        // if we have image data then we post data to out uploadProfileImage api
        if (image !== "") {
          const data = new FormData();
          data.append("profile", image);
          const res2 = await axios.post("/api/uploadProfileImage", data, {
            headers: {
              Authorization: `Bearer ${res1.data.accessToken}`,
            },
          });
          // check if response contain any error message
          if (res2.data.error) {
            setError("issue while uploading your image,try again later");
          } else {
            // else we dispatch action to save profileImage to our redux store
            dispatch({
              type: "PROFILE_IMAGE_SUCCESS",
              payload: res2.data.profileImage,
            });
          }
        }
        // after everyThing done we go back to our home screen
        setLoading(false);
        history.push("/");
      } else {
        setLoading(false);
        // if res1 contain any error we set error to local state
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
      {loading === true ? (
        <div className="fetchLoading">
          <img src={fetchLoading} alt="fetchLoading" />
        </div>
      ) : null}
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

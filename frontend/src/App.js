import "./App.css";
import { useEffect } from "react";
import Home from "./screens/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Story from "./screens/Story";
import loadingScreen from "./loadingScreen/loading.svg";
import { getTokenAction, silentAction } from "./requests/startupRequest";
import WriterScreen from "./screens/writerScreen.jsx";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Account from "./screens/Account";
import { connect } from "react-redux";

function App({ dispatch, token, tokenStatus }) {
  /*
    Get accessToken when first time loading the App and save it to 
    redux state, then use setInterval to refresh it event 15min
  */

  useEffect(() => {
    dispatch(getTokenAction()); // dispatch function first time when user load the app
    setInterval(() => {
      dispatch(silentAction()); // refresh token every 15min
    }, 900000);
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/story/:id" component={Story} />
      <Route path="/login" component={LoginScreen} />
      <Route
        path="/writer"
        render={() => {
          if (token === "") {
            return <LoginScreen />;
          } else {
            return <WriterScreen />;
          }
        }}
      />
      <Route path="/signup" component={SignUpScreen} />
      <Route
        path="/account"
        render={() => {
          if (tokenStatus === "loading") {
            return (
              <img
                src={loadingScreen}
                className="loadingScreen"
                alt="loading"
              />
            );
          } else if (tokenStatus === "success") {
            return <Account />;
          }
        }}
      />
      <Redirect to="/" />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    token: state.token.accessToken.token,
    tokenStatus: state.token.accessToken.status,
  };
}

export default connect(mapStateToProps)(App);

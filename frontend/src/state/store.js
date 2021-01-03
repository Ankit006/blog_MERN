import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducer
import writerReducer from "./reducer/writerReducer";
import fetchStoriesReducer from "./reducer/fetchStoriesReducer.js";
import loginReducer from "./reducer/loginReducer.js";
import signUpReducer from "./reducer/signUpReducer.js";
import saveTokenReducer from "./reducer/saveToken.js";
import getProfileImage from "./reducer/getProfileImage.js";

// combine reducers
const rootReducer = combineReducers({
  writerReducer: writerReducer,
  fetchStories: fetchStoriesReducer,
  login: loginReducer,
  signup: signUpReducer,
  token: saveTokenReducer,
  profileImage: getProfileImage,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

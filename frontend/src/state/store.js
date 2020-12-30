import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducer
import writerReducer from "./reducer/writerReducer";
import fetchStoriesReducer from "./reducer/fetchStoriesReducer.js";
import loginReducer from "./reducer/loginReducer.js";
import signUpReducer from "./reducer/signUpReducer.js";

// combine reducers
const rootReducer = combineReducers({
  writerReducer: writerReducer,
  fetchStories: fetchStoriesReducer,
  login: loginReducer,
  signup: signUpReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

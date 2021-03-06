import {
  SIGNUP_USERNAME,
  SIGNUP_EMAIL,
  SIGNUP_PASSWORD,
  SIGNUP_CONFIRM_PASSWORD,
} from "../stateConstant.js";
import { initialState } from "../initialState.js";

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SIGNUP_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SIGNUP_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SIGNUP_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;

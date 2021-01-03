import { initialState } from "../initialState.js";
import {
  SAVE_TOKEN_SUCCESS,
  SAVE_TOKEN_LOADING,
  SAVE_TOKEN_FAILED,
} from "../stateConstant.js";

const saveTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN_LOADING:
      return {
        ...state,
        accessToken: {
          status: "loading",
          token: "",
        },
      };
    case SAVE_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: {
          status: "success",
          token: action.payload,
        },
      };
    case SAVE_TOKEN_FAILED:
      return {
        ...state,
        accessToken: {
          status: "failed",
          token: action.payload,
        },
      };
    default:
      return state;
  }
};

export default saveTokenReducer;

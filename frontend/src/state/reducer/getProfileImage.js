import { initialState } from "../initialState.js";
import {
  PROFILE_IMAGE_LOADING,
  PROFILE_IMAGE_SUCCESS,
  PROFILE_IMAGE_FAILED,
} from "../stateConstant.js";

const getProfileImage = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_IMAGE_LOADING:
      return {
        ...state,
        profileImage: {
          status: "loading",
          image: "",
        },
      };
    case PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profileImage: {
          status: "success",
          image: action.payload,
        },
      };
    case PROFILE_IMAGE_FAILED:
      return {
        ...state,
        profileImage: {
          status: "failed",
          image: action.payload,
        },
      };
    default:
      return state;
  }
};
export default getProfileImage;

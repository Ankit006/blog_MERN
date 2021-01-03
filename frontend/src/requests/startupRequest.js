import axios from "axios";

// silentAction will be called every 15min
export const silentAction = () => {
  return async (dispatch) => {
    dispatch({ type: "SAVE_TOKEN_LOADING" });
    const res = await axios.get("/api/refreshToken");
    if (!res.data.error) {
      dispatch({
        type: "SAVE_TOKEN_SUCCESS",
        payload: res.data.accessToken,
      });
    } else {
      dispatch({ type: "SAVE_TOKEN_FAILED", payload: res.data.error });
    }
  };
};

// getTokenAction first time when loading the app along with getImageAction
export const getTokenAction = () => {
  return async (dispatch) => {
    dispatch({ type: "SAVE_TOKEN_LOADING" });
    const res = await axios.get("/api/refreshToken");
    if (!res.data.error) {
      dispatch({
        type: "SAVE_TOKEN_SUCCESS",
        payload: res.data.accessToken,
      });
      dispatch(getImageAction(res.data.accessToken));
    } else {
      dispatch({ type: "SAVE_TOKEN_FAILED", payload: res.data.error });
    }
  };
};
// getImageAction will be called inside getTokenAction after getting accessToken
const getImageAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: "PROFILE_IMAGE_LOADING" });
    const imgReponse = await axios.get("/api/getUserImage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!imgReponse.data.error) {
      dispatch({
        type: "PROFILE_IMAGE_SUCCESS",
        payload: imgReponse.data.image,
      });
    } else {
      dispatch({
        type: "PROFILE_IMAGE_FAILED",
        payload: imgReponse.data.error,
      });
    }
  };
};

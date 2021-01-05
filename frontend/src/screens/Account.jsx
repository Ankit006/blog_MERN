import React, { useEffect, useState } from "react";
import AccountDetails from "../components/account/AccountDetails";
import { connect } from "react-redux";
import getAccountData from "../requests/getAccountData";
import loadingScreen from "../loadingScreen/loading.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";
function Account({ dispatch, token, profileImage }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const history = useHistory();
  useEffect(() => {
    getAccountData(token, setUsername, setLoading, setEmail);
  }, []);
  const deleteAccount = async () => {
    const res = await axios.delete("/api/deleteAccount", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.error) {
      dispatch({ type: "PROFILE_IMAGE_REMOVE" });
      dispatch({ type: "SAVE_TOKEN_REMOVE" });
      history.goBack();
    } else {
      setError("there is a issue while removing your account");
    }
  };

  return (
    <div>
      {loading === false ? (
        <AccountDetails
          profileImage={profileImage}
          username={username}
          email={email}
          deleteAccount={deleteAccount}
          error={error}
        />
      ) : (
        <img src={loadingScreen} className="loadingScreen" alt="loading" />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.token.accessToken.token,
    profileImage: state.profileImage.profileImage.image,
  };
}

export default connect(mapStateToProps)(Account);

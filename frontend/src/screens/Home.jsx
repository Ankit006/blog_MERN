import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import Card from "../components/home/Card";
import fetchLoading from "../loadingScreen/fetch.svg";
import getAllStories from "../requests/getAllStories";
import axios from "axios";
import { connect } from "react-redux";

function Home({ profileImage, dispatch, token }) {
  const [allStories, setAllStories] = useState([]);
  const [dropDown, setDropDown] = useState("none");
  const [loading, setLoading] = useState(null);
  const showDropDown = () => {
    if (dropDown === "none") {
      setDropDown("block");
    } else {
      setDropDown("none");
    }
  };

  const logout = async () => {
    setLoading(true);
    await axios.delete("/api/removeToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SAVE_TOKEN_REMOVE" });
    dispatch({ type: "PROFILE_IMAGE_REMOVE" });
    setLoading(false);
    setDropDown("none");
  };

  useEffect(() => {
    getAllStories(setAllStories);
  }, []);

  return (
    <div>
      {loading === true ? (
        <div className="fetchLoading">
          <img src={fetchLoading} alt="fetchLoading" />
        </div>
      ) : null}
      <Navbar
        profileImage={profileImage}
        showDropDown={showDropDown}
        dropDown={dropDown}
        logout={logout}
      />
      <div className="cardPannel">
        {allStories.map((data) => (
          <Card
            author={data.author}
            key={data._id}
            story={data.story}
            title={data.heading}
            storyId={data._id}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    status: state.profileImage.profileImage.status,
    profileImage: state.profileImage.profileImage.image,
    token: state.token.accessToken.token,
  };
}

export default connect(mapStateToProps)(Home);

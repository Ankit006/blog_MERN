import React, { useEffect, useState } from "react";
import axios from "axios";
import authData from "../auth.js";
import Navbar from "../components/home/Navbar";
import Card from "../components/home/Card";
import { connect } from "react-redux";

function Home({ dispatch, allStories, loading }) {
  const getData = async () => {
    const ref = await axios.get("/api/getData", {
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    });
    dispatch({ type: "FETCH_STORIES", payload: ref.data });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="cardPannel">
        {loading ? (
          <h1>loading</h1>
        ) : (
          allStories.map((data) => (
            <Card
              author={data.author}
              key={data._id}
              story={data.story}
              title={data.heading}
              storyId={data._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    allStories: state.fetchStories.allStories.story,
    loading: state.fetchStories.allStories.loading,
  };
}

export default connect(mapStateToProps)(Home);

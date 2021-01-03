import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import Card from "../components/home/Card";
import getAllStories from "../requests/getAllStories";
import { connect } from "react-redux";

function Home({ profileImage }) {
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    getAllStories(setAllStories);
  }, []);

  return (
    <div>
      <Navbar profileImage={profileImage} />
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
  };
}

export default connect(mapStateToProps)(Home);

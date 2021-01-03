import React, { useState } from "react";
import HeadingField from "../components/writer/HeadingField";
import StoryField from "../components/writer/StoryField";
import AuthorField from "../components/writer/AuthorField";
import UploadImage from "../components/writer/UploadImage";
import axios from "axios";
import { connect } from "react-redux";

function WriterScreen({ dispatch, storyData, authorData, headingData, token }) {
  const [image, setImage] = useState("");
  // handle state
  function handleHeadingField(event) {
    dispatch({ type: "HEADING_CHANGE", payload: event.target.value });
  }
  function handleStoryField(event) {
    dispatch({ type: "STORY_CHANGE", payload: event.target.value });
  }
  function handleAuthorField(event) {
    dispatch({ type: "AUTHOR_CHANGE", payload: event.target.value });
  }

  function handleImage(event) {
    setImage(event.target.files[0]);
  }

  const sendWriterData = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/api/writer",
      {
        author: authorData,
        heading: headingData,
        story: storyData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    const data = new FormData();
    data.append("story", image);
    data.append("storyId", res.data.id);
    const imageResponse = await axios.post("/api/uploadStoryImage", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(imageResponse.data);
  };

  //return values
  return (
    <div className="writer">
      <HeadingField value={headingData} handler={handleHeadingField} />
      <StoryField value={storyData} handler={handleStoryField} />
      <AuthorField value={authorData} handler={handleAuthorField} />
      <UploadImage handleImage={handleImage} imageName={image.name} />
      <input
        type="submit"
        value="save"
        onClick={sendWriterData}
        className="submit"
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    storyData: state.writerReducer.storyData,
    headingData: state.writerReducer.headingData,
    authorData: state.writerReducer.authorData,
    token: state.token.accessToken.token,
  };
}

export default connect(mapStateToProps)(WriterScreen);

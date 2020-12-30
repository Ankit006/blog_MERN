import React from "react";
import HeadingField from "../components/writer/HeadingField";
import StoryField from "../components/writer/StoryField";
import AuthorField from "../components/writer/AuthorField";
import auth from "../auth.js";
import axios from "axios";
import { connect } from "react-redux";

function WriterScreen({ dispatch, storyData, authorData, headingData }) {
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

  const sendWriterData = async () => {
    const res = await axios.post("/api/writer", {
      author: authorData,
      heading: headingData,
      story: storyData,
    });
    console.log(res.data);
  };

  //return values
  return (
    <div>
      <HeadingField value={headingData} handler={handleHeadingField} />
      <StoryField value={storyData} handler={handleStoryField} />
      <AuthorField value={authorData} handler={handleAuthorField} />
      <input type="submit" value="save" onClick={sendWriterData} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    storyData: state.writerReducer.storyData,
    headingData: state.writerReducer.headingData,
    authorData: state.writerReducer.authorData,
  };
}

export default connect(mapStateToProps)(WriterScreen);

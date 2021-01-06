import React, { useState } from "react";
import HeadingField from "../components/writer/HeadingField";
import StoryField from "../components/writer/StoryField";
import AuthorField from "../components/writer/AuthorField";
import fetchLoading from "../loadingScreen/fetch.svg";
import UploadImage from "../components/writer/UploadImage";
import axios from "axios";
import { connect } from "react-redux";

function WriterScreen({ dispatch, storyData, authorData, headingData, token }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
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
    setMessage(null);
    setError(null);
    if (authorData === "" || (headingData === "" && storyData === "")) {
      setError("Please fill the fields in order to save your story");
    } else {
      setError(null);
      setLoading(true);
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
      if (!res.data.error) {
        if (image !== "") {
          const data = new FormData();
          data.append("story", image);
          data.append("storyId", res.data.id);
          const imageResponse = await axios.post(
            "/api/uploadStoryImage",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (imageResponse.data.error) {
            setError(imageResponse.data.error);
          }
        }
      } else {
        setError(res.data.error);
      }
      if (!error) {
        setMessage("Successfully saved");
      }
      setLoading(false);
    }
  };

  //return values
  return (
    <div>
      {loading === true ? (
        <div className="fetchLoading">
          <img src={fetchLoading} alt="fetchLoading" />
        </div>
      ) : null}
      <div className="writer">
        <HeadingField value={headingData} handler={handleHeadingField} />
        <StoryField value={storyData} handler={handleStoryField} />
        <AuthorField value={authorData} handler={handleAuthorField} />
        <UploadImage handleImage={handleImage} imageName={image.name} />
        <p className="error">{error}</p>
        <p className="message">{message}</p>
        <input
          type="submit"
          value="save"
          onClick={sendWriterData}
          className="submit"
        />
      </div>
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

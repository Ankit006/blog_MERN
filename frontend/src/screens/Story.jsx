import Story from "../components/story/story";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleStory from "../requests/getSingleStory";
export default function StoryScreen() {
  const [author, setAuthor] = useState();
  const [heading, setHeading] = useState();
  const [story, setStory] = useState();
  const [loading, setLoading] = useState(true);
  const [storyImage, setStoryImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    getSingleStory(
      id,
      setAuthor,
      setHeading,
      setStory,
      setStoryImage,
      setLoading
    );
  }, [id]);
  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <Story
          author={author}
          title={heading}
          story={story}
          imageLink={storyImage}
        />
      )}
    </div>
  );
}

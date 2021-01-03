import axios from "axios";
const getSingleStory = async (
  id,
  setAuthor,
  setHeading,
  setStory,
  setStoryImage,
  setLoading
) => {
  const response = await axios.post("/api/getStory", { id });
  setAuthor(response.data.author);
  setHeading(response.data.heading);
  setStory(response.data.story);
  setStoryImage(response.data.image);
  setLoading(false);
};

export default getSingleStory;

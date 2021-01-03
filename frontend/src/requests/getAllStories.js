import axios from "axios";

const getAllStories = async (setAllStories) => {
  const ref = await axios.get("/api/getAllStories");
  setAllStories(ref.data);
};

export default getAllStories;

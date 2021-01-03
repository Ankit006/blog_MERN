import authenticate from "../middleware/authenticate.js";
import Writer from "../models/writerModel.js";
import express from "express";

const getStoryRouter = express.Router();

getStoryRouter.post("/getStory", async (req, res) => {
  try {
    const story = await Writer.findById(req.body.id);
    res.json({
      heading: story.heading,
      author: story.author,
      story: story.story,
      image: story.storyImage.compressedUrl,
    });
  } catch (err) {
    res.send(err);
  }
});

export default getStoryRouter;

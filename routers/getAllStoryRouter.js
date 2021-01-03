import express from "express";
import Writer from "../models/writerModel.js";
export const getDataRouter = express.Router();

getDataRouter.get("/getAllStories", async (req, res) => {
  try {
    const data = await Writer.find({});
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

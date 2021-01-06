import express from "express";
import Writer from "../models/writerModel.js";
import authenticate from "../middleware/authenticate.js";
export const writerRouter = express.Router();

writerRouter.post("/writer", authenticate, async (req, res) => {
  try {
    const writer = new Writer(req.body);
    writer.userId = req.userId;
    await writer.save();
    res.json({
      message: "Successful",
      id: writer._id,
    });
  } catch (err) {
    res.json({
      message: "Issue while uploading story, try again later",
    });
  }
});

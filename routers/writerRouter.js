import express from "express";
import Writer from "../models/writerModel.js";
import authenticate from "../middleware/authenticate.js";
import User from "../models/userModel.js";
export const writerRouter = express.Router();

writerRouter.post("/writer", authenticate, async (req, res) => {
  try {
    const writer = new Writer(req.body);
    const user = await User.findOne({ email: req.userEmail });
    writer.userId = user._id;
    const data = await writer.save();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

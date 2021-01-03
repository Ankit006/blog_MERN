import express from "express";
import authenticate from "../middleware/authenticate.js";
import User from "../models/userModel.js";

const getUserImage = express.Router();

getUserImage.get("/getUserImage", authenticate, async (req, res) => {
  const user = await User.findById(req.userId);
  if (user.profileImage) {
    res.json({
      image: user.profileImage.compressedUrl,
    });
  } else {
    res.json({
      error: "no image found",
    });
  }
});

export default getUserImage;

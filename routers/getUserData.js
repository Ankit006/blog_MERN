import express from "express";
import authenticate from "../middleware/authenticate.js";
import User from "../models/userModel.js";
const getUserData = express.Router();

getUserData.get("/getUserData", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.json({
      error: "Cannot get User data,please try again",
    });
  }
});

export default getUserData;

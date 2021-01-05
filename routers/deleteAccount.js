import express from "express";
import authenticate from "../middleware/authenticate.js";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import cloudenary from "cloudinary";

dotenv.config();

const deleteAccount = express.Router();
const cloud = cloudenary.v2;

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

deleteAccount.delete("/deleteAccount", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const response = await cloud.uploader.destroy(user.profileImage.public_id);
    await User.deleteOne({ _id: req.userId });
    res.clearCookie("RefreshToken");
    res.json({
      message: "Account deleted",
      imgResponse: response,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

export default deleteAccount;

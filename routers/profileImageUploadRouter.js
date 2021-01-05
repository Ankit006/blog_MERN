import multer from "multer";
import express from "express";
import dotenv from "dotenv";
import cloudenary from "cloudinary";
import authenticate from "../middleware/authenticate.js";
import User from "../models/userModel.js";

dotenv.config();

const cloud = cloudenary.v2;
const profileImageUpload = express.Router();
const upload = multer();

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

profileImageUpload.post(
  "/uploadProfileImage",
  authenticate,
  upload.single("profile"),
  async (req, res) => {
    try {
      const buf = req.file.buffer.toString("base64");
      const response = await cloud.uploader.upload(
        `data:${req.file.mimetype};base64,` + buf,
        {
          folder: "blog",
          eager: {
            quality: "auto",
            transformation: { width: 200, height: 100 },
          },
          eager_async: true,
        }
      );
      const user = await User.findById(req.userId);
      user.profileImage.public_id = response.public_id;
      user.profileImage.originalUrl = response.secure_url;
      user.profileImage.compressedUrl = response.eager[0].secure_url;
      await user.save();

      res.json({
        success: "successfully upload image",
        profileImage: response.eager[0].secure_url,
      });
    } catch (Err) {
      res.json({ error: "error while uploading image" });
    }
  }
);

export default profileImageUpload;

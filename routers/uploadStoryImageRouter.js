import multer from "multer";
import cloudenary from "cloudinary";
import express from "express";
import dotenv from "dotenv";
import authenticate from "../middleware/authenticate.js";
import Writer from "../models/writerModel.js";

dotenv.config();

const cloud = cloudenary.v2;
const uploadStoryImage = express.Router();
const upload = multer();

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

uploadStoryImage.post(
  "/uploadStoryImage",
  authenticate,
  upload.single("story"),
  async (req, res) => {
    try {
      const buf = req.file.buffer.toString("base64");
      const response = await cloud.uploader.upload(
        `data:${req.file.mimetype};base64,` + buf,
        {
          folder: "blog",
          eager: {
            quality: "auto",
            transformation: { width: 1000, height: 700 },
          },
          eager_async: true,
        }
      );
      const writer = await Writer.findById(req.body.storyId);
      writer.storyImage.public_id = response.public_id;
      writer.storyImage.originalUrl = response.secure_url;
      writer.storyImage.compressedUrl = response.eager[0].secure_url;
      await writer.save();
      res.json({
        message: "Successful",
      });
    } catch (Err) {
      res.send(Err);
    }
  }
);

export default uploadStoryImage;

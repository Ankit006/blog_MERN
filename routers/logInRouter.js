import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const logInRouter = express.Router();

logInRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ error: "user or password is incorrect" }); // if there is no user than send an error with json

    const testPassword = await bcrypt.compare(req.body.password, user.password);
    if (!testPassword)
      return res.json({ error: "user or password is incorrect" }); // if password doesn't match

    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    ); // generate access token
    const refreshToken = await jwt.sign(
      { id: user._id },
      process.env.REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    ); // generate refresh token

    const profileImage = user.profileImage.compressedUrl;

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
    });

    res.status(200).json({
      message: "Login Successful",
      profileImage,
      accessToken: accessToken,
    });
  } catch (err) {
    res.json({ error: "user or password is incorrect" });
  }
});

export default logInRouter;

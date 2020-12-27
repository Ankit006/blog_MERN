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
    if (!user)
      return res.status(404).json({ error: "user or password is incorrect" }); // if there is no user than send an error with json

    const testPassword = await bcrypt.compare(req.body.password, user.password);
    if (!testPassword)
      return res.status(404).json({ error: "user or password is incorrect" }); // if password doesn't match

    const accessToken = await jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    ); // generate access token
    const refreshToken = await jwt.sign(
      { username: user.username },
      process.env.REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    ); // generate refresh token

    res.cookie("RefreshToken", refreshToken, { httpOnly: true,sameSite:"lax",secure:true});

    res.status(200).json({
      message: "Login Successful",
      accessToken: accessToken,
    });
  } catch (err) {
    res.send(err);
  }
});

export default logInRouter;

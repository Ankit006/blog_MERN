import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signUpRouter = express.Router();

signUpRouter.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15min" }
    );
    const refreshToken = await jwt.sign(
      { id: user._id },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );
    const data = await user.save();
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
    });
    res
      .status(200)
      .json({ message: "Sign Up SuccessFul", accessToken: accessToken });
  } catch (err) {
    res.json({ error: err.keyPattern });
  }
});

export default signUpRouter;

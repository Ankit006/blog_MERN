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
      { username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "15min" }
    );
    const refreshToken = await jwt.sign(
      { username: user.username },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );
    const data = await user.save();
    res.cookie("RefreshToken", refreshToken, { httpOnly: true,sameSite:"lax",secure:true });
    res.status(200).json({ message: "Sign Up SuccessFul", accessToken: accessToken });
  } catch (err) {
    res.json({error:err.keyPattern})
  }
});

export default signUpRouter;

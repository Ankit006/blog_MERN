import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const refreshTokenRouter = express.Router();

refreshTokenRouter.get("/refreshToken", async (req, res) => {
  try {
    const tokens = req.cookies;
    if (!tokens.RefreshToken) return res.json({ error: "Unauthorized Access" });

    const payload = await jwt.verify(
      tokens.RefreshToken,
      process.env.REFRESH_KEY
    );
    const user = await User.findById(payload.id);
    if (!user) return res.json({ error: "Unauthorized Access" });

    //  generate new access token and a new refreshToken
    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = await jwt.sign(
      { id: user._id },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
    }); // set a new RefreshToken Cookie
    res.json({ accessToken: accessToken }); // set a new access Token
  } catch (err) {
    res.status(401).json({ error: "Unauthorized Access" });
  }
});

export default refreshTokenRouter;

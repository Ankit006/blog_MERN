import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const refreshTokenRouter = express.Router();

refreshTokenRouter.get("/refreshToken", async (req, res) => {
  try {
    const tokens = req.cookies;
    if (!tokens.RefreshToken)
      return res.json({ error: "Unauthorized Access" });

    const payload = await jwt.verify(tokens.RefreshToken, process.env.REFRESH_KEY);

    //  generate new access token and a new refreshToken
    const accessToken = await jwt.sign({username:payload.username},process.env.SECRET_KEY,{expiresIn:"15m"});
    const refreshToken = await jwt.sign({username:payload.username},process.env.REFRESH_KEY,{expiresIn:"7d"});
    
    res.cookie("RefreshToken", refreshToken, { httpOnly: true,sameSite:"lax",secure:true }); // set a new RefreshToken Cookie
    res.json({ accessToken:accessToken }); // set a new access Token

  } catch (err) {
    res.status(401).json({ error: "Unauthorized Access" });
  }
});

export default refreshTokenRouter;

import express from "express";
import authenticate from "../middleware/authenticate.js";

const removeToken = express.Router();

removeToken.delete("/removeToken", authenticate, (req, res) => {
  try {
    res.clearCookie("RefreshToken");
    res.json({
      message: "successful",
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

export default removeToken;

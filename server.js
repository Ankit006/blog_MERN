import express from "express";
import helmet from "helmet";
import https from "https";
import Writer from "./models/writerModel.js";
import dbConnect from "./dbconnect.js";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import csrf from "csurf";
// routers
import { writerRouter } from "./routers/writerRouter.js";
import { getDataRouter } from "./routers/getAllStoryRouter.js";
import signUpRouter from "./routers/singUpRouter.js";
import logInRouter from "./routers/logInRouter.js";
import refreshTokenRouter from "./routers/refreshTokenRouter.js";
import profileImageUpload from "./routers/profileImageUploadRouter.js";
import getStoryRouter from "./routers/getStoryRouter.js";
import uploadStoryImage from "./routers/uploadStoryImageRouter.js";
import getUserImage from "./routers/getUserImageRouter.js";

const app = express();
const port = process.env.PORT || 5000;
const privateKey = fs.readFileSync("./key.pem", "utf-8");
const certificate = fs.readFileSync("./cert.pem", "utf-8");
const credentials = {
  key: privateKey,
  cert: certificate,
};
const httpsServer = https.createServer(credentials, app);

dbConnect();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
  "/api",
  writerRouter,
  getDataRouter,
  signUpRouter,
  logInRouter,
  getStoryRouter,
  profileImageUpload,
  refreshTokenRouter,
  uploadStoryImage,
  getUserImage
);

httpsServer.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});

import express from "express";
import helmet from "helmet";
import https from "https";
import Writer from "./models/writerModel.js";
import dbConnect from "./dbconnect.js";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import csrf from "csurf";
// routers
import { writerRouter } from "./routers/writerRouter.js";
import { getDataRouter } from "./routers/getAllDataRouter.js";
import signUpRouter from "./routers/singUpRouter.js";
import logInRouter from "./routers/logInRouter.js";
import refreshTokenRouter from "./routers/refreshTokenRouter.js";


const app = express();
const port = process.env.PORT || 5000;
const privateKey = fs.readFileSync("./key.pem","utf-8");
const certificate = fs.readFileSync("./cert.pem","utf-8");
const credentials = {
	key:privateKey,
	cert:certificate
}
const httpsServer = https.createServer(credentials,app)


dbConnect();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", writerRouter, getDataRouter, signUpRouter,logInRouter,refreshTokenRouter);


httpsServer.listen(port, () => {
	console.log(`server is up and running on port ${port}`);
});

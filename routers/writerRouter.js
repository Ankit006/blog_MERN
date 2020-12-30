import express from "express";
import Writer from "../models/writerModel.js";
import authenticate from "../middleware/authenticate.js";
export const writerRouter = express.Router();

writerRouter.post("/writer",authenticate,async (req, res) => {
	try {
		const writer = new Writer(req.body);
		const data = await writer.save();
		console.log(req.body);
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

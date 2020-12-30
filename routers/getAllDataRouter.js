import express from "express";
import Writer from "../models/writerModel.js";
import authenticate from "../middleware/authenticate.js";
export const getDataRouter = express.Router();

getDataRouter.get("/getData",async (req, res) => {
	try {
		const data = await Writer.find({});
		res.send(data);
	} catch (err) {
		res.send(err);
	}
});

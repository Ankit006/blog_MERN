import mongoose from "mongoose";

const writerSchema = mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	heading: {
		type: String,
		required: true,
	},
	story: {
		type: String,
		required: true,
	},
});

const Writer = mongoose.model("Writer", writerSchema);

export default Writer;

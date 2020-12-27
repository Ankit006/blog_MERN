import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
	try {
		const db = await mongoose.connect(process.env.DB_CONNECT, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(db.connection.host);
	} catch (err) {
		console.log(err);
	}
};

export default dbConnect;

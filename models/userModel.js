import mongoose from "mongoose";
import validator from "validator";
const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) throw new Error("Invalid Email");
		},
		trim: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
});

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, unique: true },
	password: { type: String },
	rewardPoints: { type: Number, default: 0.0 },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

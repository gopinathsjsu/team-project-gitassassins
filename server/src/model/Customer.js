import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	password: { type: String },
	address: {
		city: { type: String },
		state: { type: String },
		street: { type: String },
		zipcode: { type: String },
		country: { type: String },
	},
	rewardPoints: { type: Number },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

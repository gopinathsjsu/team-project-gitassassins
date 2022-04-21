import mongoose from "mongoose";
import config from "./config.js";
import app from '../app.js'

const mongoInit = () => {
	try {
		mongoose.connect(config.mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 500,
		});
		console.log("Mongoose is connected!");
		app.listen(3001, () => {
			console.log("Server listening on port 3001");
		});
	} catch (err) {
		console.error("Could not connect Mongoose => ", err);
	}
};

export default mongoInit;

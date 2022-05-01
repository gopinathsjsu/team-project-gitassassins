import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
	hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
	type: {
		type: String,
		enum: ["SUITE", "SINGLE", "KING", "QUEEN"],
		default: "SINGLE",
	},
	price: { type: Number },
	totalCount: { type: Number },
	maximumOccupancy: { type: Number },
	photoUrl: { type: String },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;

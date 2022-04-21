import mongoose from "mongoose";

const Schema = mongoose.Schema;

const room = new Schema({
	hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
	type: { type: String },
	price: { type: Number },
	totalCount: { type: Number },
	maximumOccupancy: { type: Number },
});

const Room = mongoose.model("Room", room);
export default Room;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
	},
	rooms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			numberOfRooms: Number,
			ref: "Room",
		},
	],
	hotelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hotel",
	},
	roomType: { type: String },
	startDate: { type: Date },
	endDate: { type: Date },
	numberOfGuests: { type: Number },
	status: { type: String },
	amenities: {
		breakfast: {
			type: Boolean,
			default: false,
		},
		fitnessRoom: {
			type: Boolean,
			default: false,
		},
		pool: {
			type: Boolean,
			default: false,
		},
		parking: {
			type: Boolean,
			default: false,
		},
		meals: {
			type: Boolean,
			default: false,
		},
	},
	totalBill: {
		type: Number,
	},
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;

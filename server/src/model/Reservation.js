import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
	},
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
	},
	hotelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hotel",
	},
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
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;

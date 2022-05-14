import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	reservationId: { type: String },
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
	},
	roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
	// store each room in the reservation as a single
	hotelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hotel",
	},
	roomType: { type: String },
	startDate: { type: Date },
	endDate: { type: Date },
	numberOfGuests: { type: Number },
	status: { type: String, enum: ["ACTIVE", "CANCELLED"] },
	numberOfRooms: {type: Number},
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

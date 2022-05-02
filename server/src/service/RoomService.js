import Room from "../model/Room.js";
import Reservation from "../model/Reservation.js";

export class RoomService {
	create = async (req, res) => {
		try {
			console.log(req.body);

			const newRoom = new Room({
				hotelId: req.body.hotelId,
				type: req.body.type, // "SUITE", "SINGLE", "KING", "QUEEN"
				price: req.body.price,
				totalCount: req.body.totalCount,
				maximumOccupancy: req.body.maximumOccupancy,
				photoUrl: req.body.photoUrl ? req.body.photoUrl : null,
			});

			const response = await newRoom.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	// delete can be done

	searchRoomAvailability = async (req, res) => {
		try {
			console.log(req.query);

			const hotelId = req.query.hotelId;
			const startDate = new Date(req.query.startDate);
			const endDate = new Date(req.query.endDate);

			const singleRoom = await Room.find({
				hotelId: hotelId,
				type: "SINGLE",
			});
			console.log(JSON.stringify(singleRoom));
			console.log("Total SINGLE rooms: ", singleRoom[0].totalCount);

			const kingRoom = await Room.find({
				hotelId: hotelId,
				type: "KING",
			});

			console.log("Total KING rooms: ", kingRoom[0].totalCount);

			const queenRoom = await Room.find({
				hotelId: hotelId,
				type: "QUEEN",
			});

			console.log("Total QUEEN rooms: ", queenRoom[0].totalCount);

			const suiteRoom = await Room.find({
				hotelId: hotelId,
				type: "SUITE",
			});

			console.log("Total SUITE rooms: ", suiteRoom[0].totalCount);

			const singleRoomsBooked = await Reservation.find({
				hotelId: hotelId,
				startDate: {
					$gte: startDate,
				},
				endDate: {
					$lte: endDate,
				},
				roomType: "SINGLE",
			}).count();

			console.log(
				"Number of SINGLE rooms booked in that date range: ",
				singleRoomsBooked
			);

			const kingRoomsBooked = await Reservation.find({
				hotelId: hotelId,
				startDate: {
					$gte: startDate,
				},
				endDate: {
					$lte: endDate,
				},
				roomType: "KING",
			}).count();

			console.log(
				"Number of KING rooms booked in that date range: ",
				kingRoomsBooked
			);

			const queenRoomsBooked = await Reservation.find({
				hotelId: hotelId,
				startDate: {
					$gte: startDate,
				},
				endDate: {
					$lte: endDate,
				},
				roomType: "QUEEN",
			}).count();

			console.log(
				"Number of QUEEN rooms booked in that date range: ",
				queenRoomsBooked
			);

			const suiteRoomsBooked = await Reservation.find({
				hotelId: hotelId,
				startDate: {
					$gte: startDate,
				},
				endDate: {
					$lte: endDate,
				},
				roomType: "SUITE",
			}).count();

			console.log(
				"Number of SUITE rooms booked in that date range: ",
				suiteRoomsBooked
			);

			const availability = {
				single: {
					availableRooms: Math.abs(
						singleRoom[0].totalCount - singleRoomsBooked
					),
					maximumOccupancy: singleRoom[0].maximumOccupancy,
					price: singleRoom[0].price,
					photoUrl: singleRoom[0].photoUrl,
				},
				king: {
					availableRooms: Math.abs(
						kingRoom[0].totalCount - kingRoomsBooked
					),
					maximumOccupancy: kingRoom[0].maximumOccupancy,
					price: kingRoom[0].price,
					photoUrl: kingRoom[0].photoUrl,
				},
				queen: {
					availableRooms: Math.abs(
						queenRoom[0].totalCount - queenRoomsBooked
					),
					maximumOccupancy: queenRoom[0].maximumOccupancy,
					price: queenRoom[0].price,
					photoUrl: queenRoom[0].photoUrl,
				},
				suite: {
					availableRooms: Math.abs(
						suiteRoom[0].totalCount - suiteRoomsBooked
					),
					maximumOccupancy: suiteRoom[0].maximumOccupancy,
					price: suiteRoom[0].price,
					photoUrl: suiteRoom[0].photoUrl,
				},
			};

			return res.status(200).send(availability);
		} catch (err) {
			console.error(err);
		}
	};
}

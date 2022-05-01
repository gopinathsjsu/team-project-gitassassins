import Room from "../model/Room.js";

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

			const kingRoom = await Room.find({
				hotelId: hotelId,
				type: "KING",
			});

			const queenRoom = await Room.find({
				hotelId: hotelId,
				type: "QUEEN",
			});

			const suiteRoom = await Room.find({
				hotelId: hotelId,
				type: "SUITE",
			});

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
						singleRoom.totalCount - singleRoomsBooked
					),
					maximumOccupancy: singleRoom.maximumOccupancy,
					price: singleRoom.price,
					photoUrl: singleRoom.photoUrl,
				},
				king: {
					availableRooms: Math.abs(
						kingRoom.totalCount - kingRoomsBooked
					),
					maximumOccupancy: kingRoom.maximumOccupancy,
					price: kingRoom.price,
					photoUrl: kingRoom.photoUrl,
				},
				queen: {
					availableRooms: Math.abs(
						queenRoom.totalCount - queenRoomsBooked
					),
					maximumOccupancy: queenRoom.maximumOccupancy,
					price: queenRoom.price,
					photoUrl: queenRoom.photoUrl,
				},
				suite: {
					availableRooms: Math.abs(
						suiteRoom.totalCount - suiteRoomsBooked
					),
					maximumOccupancy: suiteRoom.maximumOccupancy,
					price: suiteRoom.price,
					photoUrl: suiteRoom.photoUrl,
				},
			};

			return res.status(200).send(availability);
		} catch (err) {
			console.error(err);
		}
	};
}

import Room from "../model/Room.js";
import Reservation from "../model/Reservation.js";
import Holidays from "date-holidays";

export class RoomService {
	// create = async (req, res) => {
	// 	try {
	// 		console.log(req.body);

	// 		const newRoom = new Room({
	// 			hotelId: req.body.hotelId,
	// 			type: req.body.type, // "SUITE", "SINGLE", "KING", "QUEEN"
	// 			price: req.body.price,
	// 			totalCount: req.body.totalCount,
	// 			maximumOccupancy: req.body.maximumOccupancy,
	// 			photoUrl: req.body.photoUrl ? req.body.photoUrl : null,
	// 		});

	// 		const response = await newRoom.save();
	// 		res.status(200).send(response);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// getRoomByTypeForAdmin = async (req, res) => {
	// 	const hotelId = req.query.hotelId;
	// 	const type = req.query.type;
	// 	console.log(hotelId, type);
	// 	try {
	// 		const response = await Room.find({hotelId: hotelId, })
	// 	}
	// }

	update = async (req, res) => {
		console.log(req.body);

		const roomId = req.body.roomId;

		try {
			const roomDocument = await Room.findById(roomId);

			const updatedRoomDocument = {
				hotelId: roomDocument.hotelId,
				type: roomDocument.type,
				totalCount: req.body.totalCount
					? req.body.totalCount
					: roomDocument.totalCount,
				maximumOccupancy: req.body.maximumOccupancy
					? req.body.maximumOccupancy
					: roomDocument.maximumOccupancy,
				price: req.body.price ? req.body.price : roomDocument.price,
				photoUrl: roomDocument.photoUrl,
			};

			try {
				await Room.updateOne(
					{ _id: roomId },
					{
						$set: updatedRoomDocument,
					}
				);
			} catch (err) {
				console.error(err);
			}
		} catch (err) {
			console.error(err);
		}

		return res.status(200).send("Updated");
	};

	// delete can be done

	searchRoomTypeAvaility = async (
		hotelId,
		startDate,
		endDate,
		roomType,
		roomRequired = 1
	) => {
		try {
			console.log("roomType:", roomType);

			const rooms = await Room.findOne({
				hotelId: hotelId,
				type: roomType,
			});

			const totalRooms = rooms.totalCount;

			const roomsBooked = await Reservation.find({
				hotelId: hotelId,
				startDate: {
					$gte: startDate,
				},
				endDate: {
					$lte: endDate,
				},
				roomType: roomType,
			}).count();

			console.log(totalRooms, roomsBooked, roomRequired);

			return totalRooms - roomsBooked >= roomRequired;
		} catch (err) {
			console.log(err);
		}
	};

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
				status: "ACTIVE",
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
				status: "ACTIVE",
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
				status: "ACTIVE",
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
				status: "ACTIVE",
			}).count();

			console.log(
				"Number of SUITE rooms booked in that date range: ",
				suiteRoomsBooked
			);

			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);

			let startDay = startDateObj.getUTCDay();
			let endDay = endDateObj.getUTCDay();
			let weekendSurging = false;
			if (startDay == 0 || endDay == 0 || startDay == 6 || endDay == 6) {
				weekendSurging = true;
			}
			// Saturday = 6, Sunday = 0

			let holidays = new Holidays();
			holidays.init("US", "CA");
			let holidaySurging = false;
			for (
				let loopTime = startDate.getTime();
				loopTime < endDate.getTime();
				loopTime += 86400000
			) {
				let loopDay = new Date(loopTime);
				if (holidays.isHoliday(loopDay)) {
					console.log(loopDay);
					holidaySurging = true;
					break;
				}
			}

			let totalSurging = 0;
			if (holidaySurging == true) {
				totalSurging += 25;
			}
			if (weekendSurging == true) {
				totalSurging += 15;
			}

			let availability = [];

			if (totalSurging > 0) {
				const single = {
					type: "SINGLE",
					availableRooms: Math.abs(
						singleRoom[0].totalCount - singleRoomsBooked
					),
					maximumOccupancy: singleRoom[0].maximumOccupancy,
					price:
						singleRoom[0].price +
						(singleRoom[0].price * totalSurging) / 100,
					photoUrl: singleRoom[0].photoUrl,
				};
				availability.push(single);
				const king = {
					type: "KING",
					availableRooms: Math.abs(
						kingRoom[0].totalCount - kingRoomsBooked
					),
					maximumOccupancy: kingRoom[0].maximumOccupancy,
					price:
						kingRoom[0].price +
						(kingRoom[0].price * totalSurging) / 100,
					photoUrl: kingRoom[0].photoUrl,
				};
				availability.push(king);
				const queen = {
					type: "QUEEN",
					availableRooms: Math.abs(
						queenRoom[0].totalCount - queenRoomsBooked
					),
					maximumOccupancy: queenRoom[0].maximumOccupancy,
					price:
						queenRoom[0].price +
						(queenRoom[0].price * totalSurging) / 100,
					photoUrl: queenRoom[0].photoUrl,
				};
				availability.push(queen);
				const suite = {
					type: "SUITE",
					availableRooms: Math.abs(
						suiteRoom[0].totalCount - suiteRoomsBooked
					),
					maximumOccupancy: suiteRoom[0].maximumOccupancy,
					price:
						suiteRoom[0].price +
						(suiteRoom[0].price * totalSurging) / 100,
					photoUrl: suiteRoom[0].photoUrl,
				};
				availability.push(suite);
				return res.status(200).send(availability);
			}

			const single = {
				type: "SINGLE",
				availableRooms: Math.abs(
					singleRoom[0].totalCount - singleRoomsBooked
				),
				maximumOccupancy: singleRoom[0].maximumOccupancy,
				price: singleRoom[0].price,
				photoUrl: singleRoom[0].photoUrl,
			};
			availability.push(single);
			const king = {
				type: "KING",
				availableRooms: Math.abs(
					kingRoom[0].totalCount - kingRoomsBooked
				),
				maximumOccupancy: kingRoom[0].maximumOccupancy,
				price: kingRoom[0].price,
				photoUrl: kingRoom[0].photoUrl,
			};
			availability.push(king);
			const queen = {
				type: "QUEEN",
				availableRooms: Math.abs(
					queenRoom[0].totalCount - queenRoomsBooked
				),
				maximumOccupancy: queenRoom[0].maximumOccupancy,
				price: queenRoom[0].price,
				photoUrl: queenRoom[0].photoUrl,
			};
			availability.push(queen);
			const suite = {
				type: "SUITE",
				availableRooms: Math.abs(
					suiteRoom[0].totalCount - suiteRoomsBooked
				),
				maximumOccupancy: suiteRoom[0].maximumOccupancy,
				price: suiteRoom[0].price,
				photoUrl: suiteRoom[0].photoUrl,
			};
			availability.push(suite);

			return res.status(200).send(availability);
		} catch (err) {
			console.error(err);
		}
	};
}

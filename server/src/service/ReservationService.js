import Reservation from "../model/Reservation.js";
import { randomUUID } from "crypto";

export class ReservationService {
	create = async (req, res) => {
		console.log(req.body);
		const roomsData = req.body.roomsData;
		const reservationId = randomUUID();

		try {
			for (let i = 0; i < roomsData.length; i++) {
				const room = roomsData[i];
				if (room.numberOfRooms == 1) {
					const newReservation = new Reservation({
						reservationId: reservationId,
						customerId: room.customerId,
						roomId: room.roomId,
						hotelId: room.hotelId,
						roomType: room.roomType,
						startDate: new Date(room.startDate),
						endDate: new Date(room.endDate),
						numberOfGuests: room.numberOfGuests,
						status: "ACTIVE",
						amenities: room.amenities,
						totalBill: room.totalBill,
					});

					await newReservation.save();
				} else {
					for (let i = 0; i < room.numberOfRooms; i++) {
						const newReservation = new Reservation({
							reservationId: reservationId,
							customerId: room.customerId,
							roomId: room.roomId,
							hotelId: room.hotelId,
							roomType: room.roomType,
							startDate: new Date(room.startDate),
							endDate: new Date(room.endDate),
							numberOfGuests: room.numberOfGuests,
							status: "ACTIVE",
							amenities: room.amenities,
							totalBill: room.totalBill,
						});

						await newReservation.save();
					}
				}
			}
			return res.status(200).send("Successfully saved the reservation");
		} catch (err) {
			console.error(err);
			res.status(500).send("Error making reservation");
		}
	};
}

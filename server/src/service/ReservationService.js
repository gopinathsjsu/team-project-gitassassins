import Reservation from "../model/Reservation.js";
import { randomUUID } from "crypto";
import { RoomService } from "../service/RoomService.js";
import amenities from "../../utils/constants.js";
import Room from "../model/Room.js";
import Customer from "../model/Customer.js";

const roomService = new RoomService();
export class ReservationService {
	create = async (req, res) => {
		console.log(req.body);
		const roomsData = req.body.roomsData;
		const reservationId = randomUUID();
		const customerId = roomsData[0].customerId;
		const rewardPoints = roomsData[0].totalBill / 10;

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

			await Customer.updateOne(
				{ _id: customerId },
				{ $set: { rewardPoints: rewardPoints } }
			);

			return res.status(200).send("Successfully saved the reservation");
		} catch (err) {
			console.error(err);
			res.status(500).send("Error making reservation");
		}
	};

	fetchAllReservationsByHotel = async (req, res) => {
		try {
			console.log(req.params.hotelId);

			const reservations = await Reservation.find({
				hotelId: req.params.hotelId,
			});

			console.log("reservations ", reservations);
			return res.status(200).send(reservations);
		} catch (err) {
			console.error(err);
		}
	};

	fetchActiveReservationByHotel = async (req, res) => {
		try {
			var date = new Date();
			const reservations = await Reservation.find({
				hotelId: req.params.hotelId,
				endDate: {
					$gte: date,
				},
			});

			return res.status(200).send(reservations);
		} catch (err) {
			console.error(err);
		}
	};

	fetchAllReservationsByCustomer = async (req, res) => {
		try {
			console.log(req.params.hotelId);

			const reservations = await Reservation.find({
				customerId: req.params.customerId,
			});

			console.log("reservations ", reservations);
			return res.status(200).send(reservations);
		} catch (err) {
			console.error(err);
		}
	};

	fetchActiveReservationByCustomer = async (req, res) => {
		try {
			var date = new Date();
			const reservations = await Reservation.find({
				customerId: req.params.customerId,
				endDate: {
					$gte: date,
				},
			});

			return res.status(200).send(reservations);
		} catch (err) {
			console.error(err);
		}
	};

	updateReservation = async (req, res) => {
		try {
			const customerId = req.params.customerId;
			const reservationId = req.params.reservationId;
			const hotelId = req.body.hotelId;
			const roomId = req.body.roomId;
			const startDate = req.body.startDate;
			const endDate = req.body.endDate;
			const numberOfRooms = req.body.numberOfRooms;
			const roomType = req.body.roomType;
			const selectedAmenities = req.body.amenities;

			var totalBill = 0;

			const newRoom = await Room.findOne({
				hotelId: hotelId,
				type: roomType,
			});

			const newRoomPrice = newRoom.price;
			const originalReservation = await Reservation.findOne({
				_id: reservationId,
			});
			const orginalBill = originalReservation.totalBill;

			totalBill += newRoomPrice;

			//checking room availibilty
			if (
				!(await roomService.searchRoomTypeAvaility(
					hotelId,
					startDate,
					endDate,
					roomType,
					numberOfRooms
				))
			)
				return res.status(200).send({
					error: "Room not available for selected date",
				});

			for (const [key, value] of Object.entries(selectedAmenities)) {
				if (value) {
					totalBill += amenities[key];
				}
			}

			totalBill *= numberOfRooms;

			const reservation = await Reservation.findOneAndUpdate(
				{ _id: reservationId },
				{
					$set: {
						startDate: startDate,
						endDate: endDate,
						numberOfRooms: numberOfRooms,
						roomType: roomType,
						amenities: selectedAmenities,
						totalBill: totalBill,
					},
				},
				{ new: true }
			);

			console.log(reservation);

			return res.status(200).send({
				updatedReservation: reservation,
				difference: totalBill - orginalBill,
			});
		} catch (err) {
			console.error(err);
		}
	};


	updateReservationDate = async(req, res) => {
		try {
			const reservationId = req.params.reservationId;
			const startDate = new Date(req.body.startDate);
			const endDate = new Date(req.body.endDate);
			const numberOfGuests = req.body.numberOfGuests;
			var maximumOccupancy = 0
			var newBill=0;
			var orginalBill=0;
		
			const originalReservation = await Reservation.find({
				reservationId: reservationId,
			});
			const hotelId = originalReservation[0].hotelId;
			

			const roomTypes = originalReservation.map(({ roomType }) => roomType);
			const roomTypeFreq = {}
			for (const roomType of roomTypes) {
				roomTypeFreq[roomType] = roomTypeFreq[roomType] ? roomTypeFreq[roomType] + 1 : 1;
			  }
			
			// const roomTypeNumber = {
			// 	"SUITE": originalReservation.map(({ "" }) => brand);
			// 	, "SINGLE", "KING", "QUEEN"
			// }

			
			orginalBill = originalReservation[0].totalBill;

			console.log("originalBill",originalReservation[0].totalBill);
			const roomAvailibility = await roomService.searchRoomAvailabilityPrice(
				hotelId,
				startDate,
				endDate
			)
			for (let roomType in roomTypeFreq) {
				const room = roomAvailibility.find(x=>x.type===roomType);
				console.log("Room", room)
				if(room.availableRooms<roomTypeFreq[roomType])
				{
					return res.status(200).send({
								message: "Room not available for selected date",
							});
				}
				maximumOccupancy+=roomAvailibility.maximumOccupancy
				newBill+= (room.price*roomTypeFreq[roomType])
				console.log("newBill",typeof(room.price), typeof(roomTypeFreq));

			}
			console.log("final Bill",newBill);

			if (maximumOccupancy<numberOfGuests){
				return res.status(200).send({
					message: "Too many guests. Please create a new reservation instead",
				});

			}

			// update(
			// 	{ _id: { $in: ['id1', 'id2', 'id3'] } },
			// 	{ $set: { visibility : yourvisibility } },
			// 	{multi: true}
			//  )
			
			let msg =`Successfully Updated! Your new Bill is: $${newBill}. `
			if (newBill-orginalBill<0){
				msg+=`You will get a refund of $${orginalBill-newBill}.`
			}
			else if(newBill-orginalBill>0){
				msg+=`You will be charged additional $${newBill-orginalBill}.`

			}
			console.log(msg);
			const reservation = await Reservation.updateMany(
				{ reservationId: reservationId },
				{
					$set: {
						startDate: startDate,
						endDate: endDate,
						numberOfGuests: numberOfGuests,
						totalBill: newBill,
					},
				},
				{ upsert: true }
			);


			
			console.log(reservation);

			return res.status(200).send({
				 message: msg,
				 reservation: reservation
			});
		} catch (err) {
			console.error(err);
		}
	};



	cancelReservation = async(req, res) => {
		try{
			
		const reservationId = req.params.reservationId;
		console.log("Request Reached", reservationId);
		let conditions = {reservationId: reservationId};
		let update = {
			$set : {
				status: "CANCELLED"
		  }
		};
		let options = { multi: true, upsert: true };
		const cancelReservation = await Reservation.updateMany(
			conditions, update, options)
		console.log(cancelReservation);

		return res.status(200).send({
			cancelReservation: cancelReservation
		});

		} catch (err) {
			console.error(err);
		}

	}
}

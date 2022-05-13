import Reservation from "../model/Reservation.js";
import { randomUUID } from "crypto";
import { RoomService } from "../service/RoomService.js";
import amenities from "../../utils/constants.js";
import Room from "../model/Room.js";

const roomService = new RoomService();

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

	fetchAllReservationsByHotel = async(req, res) =>
    {

        try {

			console.log(req.params.hotelId);
            
            const reservations = await Reservation.find(
                {
                    hotelId : req.params.hotelId
                }
            )

            console.log("reservations ", reservations);
			return res.status(200).send(reservations);


        } catch (err) {
            console.error(err);
        }

    };


	fetchActiveReservationByHotel = async(req, res) => 
	{
		try {

			var date = new Date();
            const reservations = await Reservation.find(
                {
                    hotelId : req.params.hotelId,
					endDate : {
						$gte : date
					}
                }
            )

			return res.status(200).send(reservations);


        } catch (err) {
            console.error(err);
        }

		
	}


	fetchAllReservationsByCustomer = async(req, res) =>
    {

        try {

			console.log(req.params.hotelId);
            
            const reservations = await Reservation.find(
                {
                    customerId : req.params.customerId
                }
            )

            console.log("reservations ", reservations);
			return res.status(200).send(reservations);


        } catch (err) {
            console.error(err);
        }

    };


	fetchActiveReservationByCustomer = async(req, res) => 
	{
		try {

			var date = new Date();
            const reservations = await Reservation.find(
                {
                    customerId : req.params.customerId,
					endDate : {
						$gte : date
					}
                }
            )

			return res.status(200).send(reservations);


        } catch (err) {
            console.error(err);
        }

		
	}


	updateReservation = async(req, res) => {


		try{
				const customerId = req.params.customerId;
				const reservationId = req.params.reservationId;
				const hotelId = req.body.hotelId;
				const roomId = req.body.roomId;
				const startDate = req.body.startDate;
				const endDate = req.body.endDate;
				const numberOfRooms = req.body.numberOfRooms;
				const roomType = req.body.roomType;
				const selectedAmenities = req.body.amenities;

				var totalBill = 0

				const newRoom = await Room.findOne({hotelId: hotelId,
												type: roomType});

				const newRoomPrice = newRoom.price;
				const originalReservation = await Reservation.findOne({_id: reservationId});
				const orginalBill = originalReservation.totalBill;
		
				totalBill += newRoomPrice;

				//checking room availibilty 
				if (!await roomService.searchRoomTypeAvaility(hotelId, startDate, endDate, roomType, numberOfRooms))
					return res.status(200).send({
						error: "Room not available for selected date"
					});
				
				for (const [key, value] of Object.entries(selectedAmenities)) {
					
					if(value){
						totalBill += amenities[key];
					}

				}

				totalBill *= numberOfRooms;

				const reservation = await Reservation.findOneAndUpdate(
					{_id: reservationId},
					{$set:
						{
							startDate:startDate,
							endDate: endDate,
							numberOfRooms: numberOfRooms,
							roomType : roomType,
							amenities: selectedAmenities,
							totalBill: totalBill
						}
					},
					{new : true}
					
					);
				
				console.log(reservation);


			return res.status(200).send({
				updatedReservation: reservation,
				difference : totalBill-orginalBill
			})
	
		} catch(err) {

			console.error(err);
		}
	}

	

}

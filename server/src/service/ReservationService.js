import Reservation from "../model/Reservation.js";

export class ReservationService {
	create = async (req, res) => {
		console.log(req.body);
		const roomsData = req.body.roomsData;
		try {
			for (let i = 0; i < roomsData.length; i++) {
				const room = roomsData[i];
				if (room.numberOfRooms == 1) {
					const newReservation = new Reservation({
						customerId: room.customerId,
						roomId: room.roomId,
						hotelId: room.hotelId,
						roomType: room.roomType,
						startDate: new Date(room.startDate),
						endDate: new Date(room.endDate),
						numberOfGuests: room.numberOfGuests,
						amenities: room.amenities,
						totalBill: room.totalBill,
					});

					await newReservation.save();
				} else {
					for (let i = 0; i < room.numberOfRooms; i++) {
						const newReservation = new Reservation({
							customerId: room.customerId,
							roomId: room.roomId,
							hotelId: room.hotelId,
							roomType: room.roomType,
							startDate: new Date(room.startDate),
							endDate: new Date(room.endDate),
							numberOfGuests: room.numberOfGuests,
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

}

import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

export class HotelService {
	create = async (req, res) => {
		const roomTypes = ["SINGLE", "KING", "QUEEN", "SUITE"];
		const roomImages = {
			SINGLE: "https://14reasonswhy.gr/storage/2019/04/Small-Double-Room-2.jpg",
			KING: "https://dh-prod-cdn.azureedge.net/-/media/property/destination-hotels/hotel-de-anza/deluxe-de-anza-king.jpg?ts=6a31677d-e712-4e19-be27-eb691d802baa",
			QUEEN: "https://media-cdn.tripadvisor.com/media/photo-s/06/da/82/8e/rooms-hotel-tbilisi.jpg",
			SUITE: "https://www.omnihotels.com/-/media/images/hotels/daldtn/reservationrooms/daldtn_lk_2.jpg?h=660&la=en&w=1170",
		};

		try {
			console.log(req.body);

			const newHotel = new Hotel({
				adminEmail: req.body.adminEmail,
				adminPassword: req.body.adminPassword,
				hotelName: req.body.hotelName,
				hotelAddress: req.body.hotelAddress,
				seasonalHike: req.body.seasonalHike,
				amenitiesCost: req.body.amenitiesCost,
				photoUrl: req.body.photoUrl,
			});

			const response = await newHotel.save();
			const hotelId = response.id;
			console.log("Hotel insert id => ", hotelId);

			for (const roomType of roomTypes) {
				const newRoom = new Room({
					hotelId: hotelId,
					type: roomType, // "SUITE", "SINGLE", "KING", "QUEEN"
					price: 0,
					totalCount: 0,
					maximumOccupancy: 0,
					photoUrl: roomImages[roomType],
				});

				await newRoom.save();
			}

			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	validateLogin = async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		try {
			const response = await Hotel.findOne({
				adminEmail: email,
			});

			if (response.adminPassword !== password) {
				console.log("Password mismatch");
				res.status(400).send({ validCredentials: false });
			} else {
				const hotelId = response.id;
				res.cookie("hotelId", hotelId, {
					maxAge: 3600000,
					httpOnly: false,
					path: "/",
				});

				res.status(200).send(response);
			}
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not validate hotel");
		}
	};

	updateAmenitiesPrice = async (req, res) => {
		console.log(req.body);

		const hotelId = req.body.hotelId;

		try {
			const hotelDoc = await Hotel.findById(hotelId);

			const updatedAmenitiesCost = {
				breakfastCost: req.body.breakfastCost
					? req.body.breakfastCost
					: hotelDoc.amenitiesCost.breakfastCost,
				fitnessRoomCost: req.body.fitnessRoomCost
					? req.body.fitnessRoomCost
					: hotelDoc.amenitiesCost.fitnessRoomCost,
				poolCost: req.body.poolCost
					? req.body.poolCost
					: hotelDoc.amenitiesCost.poolCost,
				parkingCost: req.body.parkingCost
					? req.body.parkingCost
					: hotelDoc.amenitiesCost.parkingCost,
				mealsCost: req.body.mealsCost
					? req.body.mealsCost
					: hotelDoc.amenitiesCost.mealsCost,
			};

			try {
				await Hotel.updateOne(
					{ _id: hotelId },
					{ $set: { amenitiesCost: updatedAmenitiesCost } }
				);
			} catch (err) {
				console.error(err);
				res.status(500).send("Error in updating hotel");
			}
		} catch (err) {
			console.error(err);
			res.status(404).send("Error in fetching hotel to be updated");
		}

		res.status(200).send("Updated amenities cost");
	};

	fetchHotels = async (req, res) => {
		try {
			const response = await Hotel.find();
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	fetchHotelById = async (req, res) => {
		const hotelId = req.params.hotelId;
		try {
			const response = await Hotel.findById(hotelId);
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	searchHotelByLocation = async (req, res) => {
		const queryString = req.params.location;
		try {
			const response = await Hotel.find({
				$or: [
					{
						"hotelAddress.street": {
							$regex: queryString,
							$options: "i",
						},
					},
					{
						"hotelAddress.city": {
							$regex: queryString,
							$options: "i",
						},
					},
					{
						"hotelAddress.state": {
							$regex: queryString,
							$options: "i",
						},
					},
					{
						"hotelAddress.zipcode": {
							$regex: queryString,
							$options: "i",
						},
					},
				],
			});
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

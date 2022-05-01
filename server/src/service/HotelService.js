import Hotel from "../model/Hotel.js";
// import CommonService from "./CommonService.js";

// const commonService = new CommonService();
export class HotelService {
	create = async (req, res) => {
		try {
			console.log(req.body);

			const newHotel = new Hotel({
				adminEmail: req.body.adminEmail,
				adminPassword: req.body.adminPasssword,
				hotelName: req.body.hotelName,
				hotelAddress: req.body.hotelAddress,
				seasonalHike: req.body.seasonalHike,
				amenitiesCost: req.body.amenitiesCost,
				photoUrl: req.body.photoUrl,
			});

			const response = await newHotel.save();
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
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

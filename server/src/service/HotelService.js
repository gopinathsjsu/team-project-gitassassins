import Hotel from "../model/Hotel.js";
import Reservation from "../model/Reservation.js";

class HotelService {
	create = async (req, res) => {
		try {
			console.log(req.body);
			
			const newHotel = new Hotel({
                hotelName : req.body.hotelName,
				hotelAddress: req.body.hotelAddress
			});
			const response = await newHotel.save();

			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};


	get_location = async (req, res) => {
		
		try {
				const hotels = await Hotel.find({}, {hotelAddress:1});

			
				res.status(200).send(hotels);
			} catch (err) {
				console.error(err);
				}
		};



	search = async ( req, res ) => {
		try {

				console.log(req.body);
				// const hotel = await Hotel.findById(req.body.hotelId).populate("rooms");
				const booked = await Reservation.aggregate([
					{
						$match: {
								_id : req.body.hotelId,
								startDate: {
									$lte: req.body.startDate,
								},
								endDate : {
									$gte: req.body.endDate
								}
							},
					},
					{
							$count: "total_reserved"
							
					}
				])

				const booked2 = Reservation.countDocuments(
					{
						_id : req.body.hotelId,
						startDate: {
							$lte: req.body.startDate,
						},
						endDate : {
							$gte: req.body.endDate
						}
					},
				)

				console.log("booked: ", booked);
				res.status(200).send("");


		} catch (err) {
		console.error(err);
	}
};



}





export default HotelService;

import User from "../model/User.js";

class HotelService {
	create = async (req, res) => {
		try {
			console.log(req.body)
			
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
}
    export default HotelService;

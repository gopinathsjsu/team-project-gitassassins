import User from "../model/User.js";

class UserService {
	create = async (req, res) => {
		try {
			console.log(req.body)
			
			const newUser = new User({
                firstname : req.body.email,
                lastname : req.body.lastname,
                email : req.body.email,
				password: req.body.password
			});
			const response = await newHotel.save();

			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}
    export default HotelService;

import Room from "../model/Room.js";

class RoomService {
	create = async (req, res) => {
		try {
			console.log(req.body);

			const newRoom = new Room({
				hotelId: req.body.hotelId,
				type: req.body.type, // "SUITE", "SINGLE", "KING", "QUEEN"
				price: req.body.price,
				totalCount: req.body.totalCount,
				maximumOccupancy: req.body.maximumOccupancy,
				photoUrl: req.body.photoUrl ? req.body.photoUrl : null,
			});

			const response = await newRoom.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	// delete can be done
}

export default RoomService;

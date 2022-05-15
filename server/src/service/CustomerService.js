import Customer from "../model/Customer.js";
import Reservation from "../model/Reservation.js";

export class CustomerService {
	create = async (req, res) => {
		console.log(req.body);
		try {
			const newCustomer = new Customer({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
			});

			const response = await newCustomer.save();
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
			res.status(500).send("Could not create customer");
		}
	};

	validateLogin = async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		try {
			const response = await Customer.findOne({
				email: email,
			});

			if (response.password !== password) {
				console.log("Password mismatch");
				res.status(400).send({ validCredentials: false });
			} else {
				const customerId = response.id;
				res.cookie("customerId", customerId, {
					maxAge: 3600000,
					httpOnly: false,
					path: "/",
				});

				res.status(200).send(response);
			}
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not validate customer");
		}
	};

	fetchCustomerById = async (req, res) => {
		const customerId = req.params.customerId;
		try {
			const response = await Customer.findById(customerId);
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	computeLoyaltyDiscount = async (req, res) => {
		const customerId = req.params.customerId;
		try {
			const bookings = await Reservation.find({ customerId: customerId });
			let numberOfNights = 0;
			for (const booking of bookings) {
				const start = new Date(booking.startDate);
				const end = new Date(booking.endDate);
				const difference =
					(end.getTime() - start.getTime()) / (1000 * 3600 * 24);
				numberOfNights += difference;
			}
			res.status(200).send({ loyaltyDiscount: numberOfNights * 0.5 });
		} catch (err) {
			console.error(err);
		}
	};
}

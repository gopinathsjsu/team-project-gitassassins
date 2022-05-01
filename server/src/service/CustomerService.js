import Customer from "../model/Customer.js";

export class CustomerService {
	create = async (req, res) => {
		console.log(req.body);
		try {
			const newCustomer = new Customer({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				address: req.body.address,
			});

			const response = await newCustomer.save();
			return res.status(200).send(response);
		} catch (err) {
			console.error(err);
			res.status(500).send("Could not create customer");
		}
	};

	validateLogin = async (req, res) => {
		const email = req.query.email;
		const password = req.query.password;

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

				res.status(200).send({
					validCredentials: true,
				});
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
}

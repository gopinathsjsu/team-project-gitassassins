import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = (theme) => ({
	...theme.spread,
	text1: {
		fontSize: "20px",
		marginTop: "50px",
		fontWeight: "600",
	},
	textField: {
		marginTop: "10px",
	},
	create: {
		color: "#3FC060",
		textDecoration: "none",
		marginLeft: "10px",
		fontSize: "15px",
	},
	new: {
		textDecoration: "none",
		fontSize: "15px",
	},
	text3: {
		marginTop: "10px",
	},
	errors: {
		fontSize: "14px",
		color: "red",
	},
	button: {
		padding: "10px 190px",
		cursor: "pointer",
		color: "white",
		marginTop: "20px",
		marginBottom: "40px",
		textTransform: "capitalize",
		fontFamily: "Bebas Neue",
		fontWeight: "600",
		fontSize: "20px",
		backgroundColor: "black",
		borderRadius: "10px",
	},
});

class hotelSignup extends Component {
	state = {
		hotelName: "",
		email: "",
		password: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		breakfastCost: null,
		fitnessRoomCost: null,
		poolCost: null,
		parkingCost: null,
		mealsCost: null,
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const payload = {
			hotelName: this.state.hotelName,
			adminEmail: this.state.email,
			adminPassword: this.state.password,
			address: {
				street: this.state.street,
				city: this.state.city,
				state: this.state.state,
				zipcode: this.state.zipcode,
			},
			amenitiesCost: {
				breakfastCost: this.state.breakfastCost,
				fitnessRoomCost: this.state.fitnessRoomCost,
				poolCost: this.state.poolCost,
				parkingCost: this.state.parkingCost,
				mealsCost: this.state.mealsCost,
			},
		};
		await axios.post(`/hotel/create`, payload);
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container direction="row">
				<Grid item sm={4}></Grid>

				<Grid item sm={4}>
					<Grid item sm={12} className={classes.text1}>
						Hotel Signup
					</Grid>

					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="hotelName"
							name="hotelName"
							placeholder="Hotel Name"
							type="text"
							className={classes.textField}
							variant="outlined"
							value={this.state.hotelName}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<TextField
							id="email"
							name="email"
							placeholder="Hotel admin email"
							type="email"
							className={classes.textField}
							variant="outlined"
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<TextField
							id="password"
							name="password"
							placeholder="Hotel admin password"
							type="password"
							className={classes.textField}
							variant="outlined"
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>

						<div>
							<br />
							<h5>Address</h5>
						</div>
						<TextField
							id="street"
							name="street"
							placeholder="Street"
							type="text"
							className={classes.textField}
							variant="outlined"
							value={this.state.street}
							onChange={this.handleChange}
							color="secondary"
						/>
						<TextField
							id="city"
							name="city"
							placeholder="City"
							type="text"
							className={classes.textField}
							variant="outlined"
							value={this.state.city}
							onChange={this.handleChange}
							color="secondary"
						/>
						<TextField
							id="state"
							name="state"
							placeholder="State"
							type="text"
							className={classes.textField}
							variant="outlined"
							value={this.state.state}
							onChange={this.handleChange}
							color="secondary"
						/>
						<TextField
							id="zipcode"
							name="zipcode"
							placeholder="Zip Code"
							type="text"
							className={classes.textField}
							variant="outlined"
							value={this.state.zipcode}
							onChange={this.handleChange}
							color="secondary"
						/>
						<div>
							<br />
							<h5>Amenities</h5>
						</div>
						<TextField
							id="breakfastCost"
							name="breakfastCost"
							placeholder="Breakfast Cost ($)"
							type="number"
							className={classes.textField}
							variant="outlined"
							value={this.state.breakfastCost}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<TextField
							id="fitnessRoomCost"
							name="fitnessRoomCost"
							placeholder="Fitness Room Cost ($)"
							type="number"
							className={classes.textField}
							variant="outlined"
							value={this.state.fitnessRoomCost}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<TextField
							id="poolCost"
							name="poolCost"
							placeholder="Pool Cost ($)"
							type="number"
							className={classes.textField}
							variant="outlined"
							value={this.state.poolCost}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<TextField
							id="parkingCost"
							name="parkingCost"
							placeholder="Parking Cost ($)"
							type="number"
							className={classes.textField}
							variant="outlined"
							value={this.state.parkingCost}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<div
							role="button"
							onClick={this.handleSubmit}
							className={classes.button}
						>
							<Link
								to="/hotelLogin"
								style={{ textDecoration: "none" }}
							>
								<div
									className={classes.checkout}
									style={{ color: "white" }}
								>
									Signup
								</div>
							</Link>
						</div>

						<div>
							<br />
						</div>
					</form>
				</Grid>

				<Grid item sm={4}></Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(hotelSignup);

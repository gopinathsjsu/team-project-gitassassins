import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
// import { Link } from 'react-router-dom'

//redux
// import {connect} from 'react-redux'
// import {signupUser} from '../redux/actions/userActions'

const styles = (theme) => ({
	...theme.spread,
	text1: {
		fontSize: "20px",
		marginTop: "50px",
		fontWeight: "600",
	},
	textField: {
		marginTop: "10px",
		marginRight: "15px",
	},
	submit: {
		marginTop: "10px",
		backgroundColor: "#7db5e3",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
	div: {
		marginBottom: "20px",
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

	handleSubmit = (event) => {
		event.preventDefault();
		var newHotel = {
			hotelName: this.state.hotelName,
			email: this.state.email,
			password: this.state.password,
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
		// this.props.signupUser(newUser, this.props.history)
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
							name="hotelname"
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
							placeholder="Email"
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
							placeholder="Password"
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
						<TextField
							id="mealsCost"
							name="mealsCost"
							placeholder="Meals Cost ($)"
							type="number"
							className={classes.textField}
							variant="outlined"
							value={this.state.mealsCost}
							onChange={this.handleChange}
							fullWidth
							color="secondary"
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							className={classes.submit}
						>
							Signup
						</Button>

						<div>
							<br />
						</div>
						{/* <Typography className={classes.errors}>
                            {this.props.errors.signupError ? this.props.errors.signupError : ''}
                        </Typography>

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Already a member? 
                            </span>
                            <Typography className={classes.create} component = {Link} to="/login" >
                                Login here
                            </Typography>
                        </Typography>

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Are you a restaurant?
                            </span>
                            <Typography className={classes.create} component = {Link} to="/restaurantSignup" >
                                Create an account here
                            </Typography>
                        </Typography> */}
					</form>
				</Grid>

				<Grid item sm={4}></Grid>
			</Grid>
		);
	}
}

// const mapStateToProps = (state) => ({
//     user : state.user,
//     errors : state.errors
// })
// export default connect(mapStateToProps, {signupUser} )(withStyles(styles)(signup))
export default withStyles(styles)(hotelSignup);

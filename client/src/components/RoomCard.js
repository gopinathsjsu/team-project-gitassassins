import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { connect } from "react-redux";
import { SET_SELECTED_ROOM, BOOK_ROOM } from "../redux/types";
import store from "../redux/store";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = (theme) => ({
	...theme.spread,
	root: {
		flexGrow: 1,
	},
	card: {
		height: "210px",
	},
	tile: {
		marginLeft: "40px",
		border: "1px solid #dbdbdb",
		"&:hover": {
			backgroundColor: "#e6e6e6",
		},
	},
	image: {
		width: "20px",
		height: "140px",
		backgroundSize: "cover",
		objectFit: "cover",
		// resize: 'both',
		backgroundPosition: "center",
	},
	name: {
		fontSize: "18px",
		fontWeight: "700",
		color: "black",
		textTransform: "capitalize",
		paddingLeft: "10px",
	},
	imgDialog: {
		maxWidth: "100%",
		height: "300px",
		backgroundSize: "cover",
		objectFit: "cover",
		resize: "both",
		backgroundPosition: "center",
	},
	input: {
		marginTop: "20px",
		marginLeft: "50px",
		width: "350px",
	},
	checkbox: {
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		marginLeft: "10px",
	},
	amenities: {
		fontSize: "18px",
		fontWeight: "700",
		marginLeft: "10px",
	},
	form: {
		margin: "0px 60px 30px 60px",
	},
	rate: {
		margin: "10px auto auto 40px",
	},
	button: {
		padding: "10px 40px",
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

class RoomCard extends Component {
	state = {
		open: false,
		numRooms: 1,
		numGuests: 1,
		breakfast: false,
		fitnessRoom: false,
		pool: false,
		parking: false,
		meals: false,
		total: 0,
		totalStay: 0,
	};

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	handleBreakfastChange = () => {
		this.setState({
			breakfast : !this.state.breakfast,
			total : this.state.total + this.state.breakfast ? this.props.hotel.breakfastRate : -this.props.hotel.breakfastRate
		});
		console.log(JSON.stringify(this.state));
	};

	handleFitnessroomChange = () => {
		this.setState({
			fitnessRoom: !this.state.fitnessRoom,
			total : this.state.total + this.state.fitnessRoom ? this.props.hotel.fitnessRate : -this.props.hotel.fitnessRate
		});
		console.log(JSON.stringify(this.state));
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleOnClick = () => {
		console.log("room: " + this.props.room.type);
		store.dispatch({
			type: SET_SELECTED_ROOM,
			payload: this.props.room.type,
		});

		this.handleOpen();
	};

	handleBookRoom = async () => {
		const { type, price, photoUrl, maximumOccupancy, availableRooms } =
			this.props.room;
		const {
			breakfastRate,
			fitnessRate,
			swimmingRate,
			parkingRate,
			mealRate,
		} = this.props.hotel;
		const { rewardPoints } = this.props.user.authenticatedUser;
		const { loyalty } = this.props.user;
		let amenitiesRate = this.state.breakfast && breakfastRate
				? breakfastRate
				: 0 + this.state.fitnessRoom && fitnessRate
				? fitnessRate
				: 0 + this.state.pool && swimmingRate
				? swimmingRate
				: 0 + this.state.parking && parkingRate
				? parkingRate
				: 0 + this.state.meals && mealRate
				? mealRate
				: 0;
		
		let loyaltyPoints = isNaN(loyalty) ? 0 : loyalty;

		let totalStay = Math.round(
			(this.state.numRooms*(price + amenitiesRate) * 1.2 -
				rewardPoints / 10 -
				loyaltyPoints) *100) / 100

		const roomDetails = {
			"roomsData" : [
				{
					customerId : this.props.user.authenticatedUser._id,
					roomId : this.props.room.roomId, 
					hotelId : this.props.hotel.selectedHotel._id,
					roomType : this.props.room.type,
					startDate : this.props.hotel.startDate,
					endDate : this.props.hotel.endDate,
					numberOfGuests : this.state.numGuests,
					numberOfRooms : this.state.numRooms,
					totalBill : totalStay,
					amenities : {
						breakfast : this.state.breakfast,
						fitnessRoom: this.state.fitnessRoom,
						pool: this.state.pool,
						parking: this.state.parking,
						meals: this.state.meals,
					}
				}
			]
		}

		console.log("roomDetails : " , this.props.user.authenticatedUser._id,  this.props.room.roomId, this.props.hotel.selectedHotel._id, this.props.room.type,)


		console.log("roomDetails : " , roomDetails.roomsData[0])
		await axios.post(`/reservation/reserve`, roomDetails).then((res) => {
			console.log("book room" + JSON.stringify(res.data));
			store.dispatch({
				type: BOOK_ROOM
			});
		});
	};

	render() {
		const { classes } = this.props;
		// console.log(JSON.stringify(this.state.checkbox))
		// console.log(JSON.stringify(this.state.checkbox[0]))
		const { type, price, photoUrl, maximumOccupancy, availableRooms } =
			this.props.room;
		const {
			breakfastRate,
			fitnessRate,
			swimmingRate,
			parkingRate,
			mealRate,
		} = this.props.hotel;
		const { rewardPoints } = this.props.user.authenticatedUser;
		const { loyalty } = this.props.user;
		let amenitiesRate = this.state.breakfast && breakfastRate
				? breakfastRate
				: 0 + this.state.fitnessRoom && fitnessRate
				? fitnessRate
				: 0 + this.state.pool && swimmingRate
				? swimmingRate
				: 0 + this.state.parking && parkingRate
				? parkingRate
				: 0 + this.state.meals && mealRate
				? mealRate
				: 0;
		// console.log("amenitiesRate "+amenitiesRate)
		
		let loyaltyPoints = isNaN(loyalty) ? 0 : loyalty;

		let totalStay = Math.round(
			(this.state.numRooms*(price + amenitiesRate) * 1.2 -
				rewardPoints / 10 -
				loyaltyPoints) *100) / 100
		
		return (
			<Grid container item xs={3} className={classes.card}>
				{/* {this.handlePrice} */}
				<div onClick={this.handleOnClick}>
					<Grid
						container
						item
						className={classes.tile}
						style={{
							backgroundColor:
								type === this.props.hotel.selectedRoom
									? "#e6e6e6"
									: "",
							border:
								type === this.props.hotel.selectedRoom
									? "1px solid #383838"
									: "",
						}}
					>
						<Grid
							container
							item
							xs={12}
							className={classes.image}
							style={{ backgroundImage: `url(${photoUrl})` }}
						></Grid>
						<Grid container item xs={12} className={classes.name}>
							{type} Room
						</Grid>
						<Grid container item xs={12} className={classes.price}>
							${price} per night
						</Grid>
						<Grid
							container
							item
							xs={12}
							className={classes.availableRooms}
						>
							{availableRooms} rooms available
						</Grid>
					</Grid>
				</div>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="md"
				>
					{/* <Dialog open={true} onClose={this.handleClose} fullWidth maxWidth="md">   */}
					<img
						className={classes.imgDialog}
						src={photoUrl}
						alt="photoUrl"
					/>

					<div className={classes.name}>{type} Room</div>

					<Grid container direction="row">
						<Grid item xs={6}>
							<TextField
								name="numRooms"
								id="numRooms"
								label="Select the number of rooms"
								type="number"
								onChange={this.handleChange}
								style={{ marginBottom: "10px" }}
								value={this.state.numRooms}
								variant="outlined"
								className={classes.input}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="numGuests"
								id="numGuests"
								label="Select the number of guests"
								type="number"
								onChange={this.handleChange}
								style={{ marginBottom: "10px" }}
								value={this.state.numGuests}
								variant="outlined"
								className={classes.input}
							/>
						</Grid>

						{this.state.numGuests / this.state.numRooms >
						maximumOccupancy ? (
							<Grid
								item
								xs={12}
								style={{
									color: "red",
									marginLeft: "10px",
									marginBottom: "30px",
								}}
							>
								Max occupancy for the {type} room is{" "}
								{maximumOccupancy}
							</Grid>
						) : (
							""
						)}

						<Grid item xs={12} className={classes.amenities}>
							Select amenities for you room
						</Grid>

						<Grid item xs={12}>
							<FormGroup className={classes.form}>
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.breakfast} name="breakfast" onChange={this.handleChange} />} label="Daily Continental Breakfast" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.fitnessRoom} name="fitnessRoom" onChange={this.handleChange}/>} label="Access to fitness room" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.pool} name="pool" onChange={this.handleChange}/>} label="Access to Swimming Pool/Jacuzzi" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.parking} name="parking" onChange={this.handleChange}/>} label="Daily Parking" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.meals} name="meals" onChange={this.handleChange}/>} label="Meals included (Breakfast, Lunch, Dinner)" />
                            </FormGroup>
						</Grid>
					</Grid>

					<Grid item xs={12} className={classes.amenities}>
						Summary of charges
					</Grid>
					<Grid container item xs={12} className={classes}>
						<Grid
							item
							xs={12}
							className={classes.rate}
							style={{ fontSize: "19px", fontWeight: "700" }}
						>
							RATE DETAILS
						</Grid>
						<Grid
							item
							xs={12}
							className={classes.rate}
							style={{
								fontSize: "13px",
								fontWeight: "600",
								color: "#878787",
							}}
						>
							{this.state.numRooms} room(s) for{" "}
							{this.state.numGuests} guest(s)
						</Grid>
						<hr style={{ color: "#d6d6d6" }} />
						<Grid container direction="row" item>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{ fontSize: "15px" }}
							>
								Room rate
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{ fontSize: "15px" }}
							>
								${Math.round(this.state.numRooms * price * 100) / 100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{
									fontSize: "15px",
									borderBottom: "1px solid #d6d6d6",
								}}
							>
								Amenities
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{
									fontSize: "15px",
									borderBottom: "1px solid #d6d6d6",
								}}
							>
								$
								{Math.round(
									amenitiesRate * this.state.numRooms * 100
								) / 100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{ fontSize: "16px", fontWeight: "600" }}
							>
								Total cash rate
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{ fontSize: "16px", fontWeight: "600" }}
							>
								$
								{Math.round(this.state.numRooms * (price + amenitiesRate) * 100) /
									100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{
									fontSize: "16px",
									fontWeight: "600",
									borderBottom: "1px solid #d6d6d6",
								}}
							>
								Estimated government taxes and fees
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{
									fontSize: "16px",
									fontWeight: "600",
									borderBottom: "1px solid #d6d6d6",
								}}
							>
								$
								{Math.round(
									this.state.numRooms * (price + amenitiesRate) * 0.2 * 100
								) / 100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{
									fontSize: "14px",
									fontWeight: "600",
									color: "#bf2e45",
								}}
							>
								Reward Points ({rewardPoints} points)
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{
									fontSize: "14px",
									fontWeight: "600",
									color: "#bf2e45",
								}}
							>
								-${Math.round((rewardPoints / 10) * 100) / 100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{
									fontSize: "14px",
									fontWeight: "600",
									borderBottom: "1px solid #d6d6d6",
									color: "#bf2e45",
								}}
							>
								Loyalty Points ({loyaltyPoints} points)
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{
									fontSize: "14px",
									fontWeight: "600",
									borderBottom: "1px solid #d6d6d6",
									color: "#bf2e45",
								}}
							>
								-${Math.round(loyaltyPoints * 100) / 100}
							</Grid>
							<Grid
								item
								xs={6}
								className={classes.rate}
								style={{ fontSize: "19px", fontWeight: "700" }}
							>
								Total Stay
							</Grid>
							<Grid
								item
								xs={4}
								className={classes.rate}
								style={{
									fontSize: "19px",
									fontWeight: "700",
									marginBottom: "30px",
								}}
							>
								$
								{totalStay}
							</Grid>
						</Grid>
					</Grid>

					<Grid container xs={12} justifyContent="center">
						<Grid item>
							<div
								role="button"
								onClick={(totalStay) => this.handleBookRoom()}
								className={classes.button}
							>
								<Link
									to="/checkout"
									style={{ textDecoration: "none" }}
								>
									<div
										className={classes.checkout}
										style={{ color: "white" }}
									>
										Book room
									</div>
								</Link>
							</div>
						</Grid>
					</Grid>
				</Dialog>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	hotel: state.hotel,
});

export default connect(mapStateToProps, {})(withStyles(styles)(RoomCard));

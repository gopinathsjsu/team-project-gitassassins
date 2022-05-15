import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import Typography from '@material-ui/core/Typography'
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

//redux
// import {connect} from 'react-redux'
// import {loginUser} from '../redux/actions/userActions'

const styles = (theme) => ({
	...theme.spread,
	text1: {
		fontSize: "30px",
		marginTop: "100px",
		fontWeight: "600",
	},
	text2: {
		fontSize: "20px",
		marginTop: "12px",
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
	textField: {
		marginTop: "10px",
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

class hotelLogin extends Component {
	state = {
		email: "",
		password: "",
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const payload = {
			email: this.state.email,
			password: this.state.password,
		};
		const response = await axios.post(`/hotel/login`, payload);
		localStorage.setItem("hotelId", response.data._id);
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container direction="row">
				<Grid item sm={4}></Grid>

				<Grid item sm={4}>
					<Grid item sm={12} className={classes.text1}>
						Welcome back
					</Grid>

					<Grid item sm={12} className={classes.text2}>
						Log in with your hotel email address.
					</Grid>

					<form noValidate onSubmit={this.handleSubmit}>
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
						/>

						{/* <Link to="/admin" style={{ textDecoration: "none" }}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								className={classes.submit}
							>
								Login
							</Button>
						</Link> */}

						<div
							role="button"
							onClick={this.handleSubmit}
							className={classes.button}
						>
							<Link
								to="/admin"
								style={{ textDecoration: "none" }}
							>
								<div
									className={classes.checkout}
									style={{ color: "white" }}
								>
									Login
								</div>
							</Link>
						</div>
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
// export default connect(mapStateToProps, {loginUser} )(withStyles(styles)(login))
export default withStyles(styles)(hotelLogin);

import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import store from "../redux/store";
import { LOCATION_FILTER } from "../redux/types";

const styles = (theme) => ({
	...theme.spread,
	root: {
		flexGrow: 1,
	},
	title: {
		marginLeft: "5px",
		fontSize: "32px",
		marginTop: "5px",
		flexGrow: 1,
		fontFamily: "Bebas Neue",
		fontWeight: "600",
		"&:hover": {
			textDecoration: "none",
		},
	},
	button: {
		fontSize: "17px",
		cursor: "pointer",
		textTransform: "capitalize",
		fontFamily:
			'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
	},
	appbar: {
		height: "90px",
		paddingTop: "10px",
	},
	dummy: {
		display: "flex",
		justifyContent: "space-around",
		flexGrow: 1,
		width: "250px",
		borderRadius: "25px",
		padding: "10px 15px",
		marginRight: "60px",
	},
	location: {
		fontSize: "16px",
		display: "flex",
		justifyContent: "space-around",
		flexGrow: 1,
		width: "450px",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		fontWeight: "600",
		backgroundColor: "#f2f2f2",
		padding: "10px 15px",
		cursor: "pointer",
		marginRight: "20px",
	},
});

class NavigationBar extends Component {
	state = {
		location: "",
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});

		store.dispatch({
			type: LOCATION_FILTER,
			payload: this.state.location,
		});
	};

	render() {
		const { classes } = this.props;
		const { authenticated, authenticatedUser } = this.props.user;
		return (
			<div>
				<AppBar
					position="relative"
					color="transparent"
					className={classes.appbar}
				>
					<Toolbar style={{ height: 50 }}>
						<MuiLink
							component={Link}
							to={`/`}
							className={classes.title}
						>
							<span style={{ color: "#162328" }}>
								Premier Inn Hotels
							</span>
						</MuiLink>

						<Button name="dummy" className={classes.dummy} />

						<InputBase
							id="location"
							name="location"
							className={classes.location}
							placeholder="Enter a location"
							onChange={this.handleChange}
							startAdornment={
								<SearchIcon style={{ color: "#2b2b2b" }} />
							}
						/>

						{/* signup */}
						{!authenticated && (
							<Button
								className={classes.button}
								component={Link}
								to="/signup"
							>
								Signup
							</Button>
						)}

						{/* login */}
						{!authenticated && (
							<Button
								className={classes.button}
								component={Link}
								to="/login"
							>
								Login
							</Button>
						)}

						{authenticated && (
							<Tooltip title="Profile">
								<Button component={Link} to="/">
									<Avatar>
										{authenticatedUser.firstName.substring(
											0,
											1
										)}
										{authenticatedUser.lastName.substring(
											0,
											1
										)}
									</Avatar>
								</Button>
							</Tooltip>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(styles)(NavigationBar));

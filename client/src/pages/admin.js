import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import React, { Component } from "react";
import landingPic from "../assets/landing.jpg";
import AdminRoomUpdate from "./AdminRoomUpdate";

import axios from "axios";

const styles = (theme) => ({
	...theme.spread,
	landingPic: {
		backgroundImage: `url(${landingPic})`,
		backgroundSize: "cover",
		objectFit: "cover",
		resize: "both",
		backgroundPosition: "center",
		width: window.innerWidth,
		height: "480px",
	},
	explore: {
		paddingTop: "20px",
		fontSize: "30px",
		fontWeight: "800",
		color: "black",
		justifyContent: "center",
	},
	main: {
		paddingBottom: "50px",
	},
});

class adminPage extends Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Grid direction="row" container className={classes.main}>
					<Grid container item sm={12}>
						<div className={classes.landingPic}></div>
					</Grid>
					<Grid
						container
						item
						xs={12}
						className={classes.explore}
					></Grid>
					<Grid container item sm={3} style={{ paddingLeft: "20px" }}>
						{/* {this.displayHotels()} */}
					</Grid>
				</Grid>
				<AdminRoomUpdate />
			</div>
		);
	}
}

export default withStyles(styles)(adminPage);

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = (theme) => ({
	...theme.spread,
	root: {
		flexGrow: 1,
	},
	card: {
		width: "300px",
		height: "210px",
		position: "relative",
		display: "flex",
		border: "1px solid #a9abaa",
	},
	name: {
		fontSize: "18px",
		fontWeight: "700",
		color: "black",
		maxHeight: "20px",
		maxWidth: "300px",
		paddingLeft: "10px",
	},
	link: {
		"&:hover": {
			textDecoration: "none",
		},
		marginRight: "26px",
		marginTop: "30px",
	},
	image: {
		width: "350px",
		height: "190px",
		backgroundSize: "cover",
		objectFit: "cover",
		resize: "both",
		backgroundPosition: "center",
	},
	address: {
		fontSize: "15px",
		fontWeight: "600",
		color: "black",
		overflow: "hidden",
		maxHeight: "20px",
		maxWidth: "300px",
		paddingLeft: "10px",
	},
});

class HotelCard extends Component {
	render() {
		const { classes } = this.props;
		const { _id, hotelName, photoUrl, hotelAddress } = this.props.hotel;

		return (
			<Grid item container xs={4}>
				<MuiLink
					component={Link}
					to={`/hotel/get/${_id}`}
					className={classes.link}
				>
					<Grid container item xs={12}>
						<div
							className={classes.image}
							style={{ backgroundImage: `url(${photoUrl})` }}
						></div>
					</Grid>

					<Grid container item xs={12} className={classes.name}>
						{hotelName}
					</Grid>
					<Grid container item xs={12} className={classes.address}>
						{hotelAddress.street}, {hotelAddress.city},{" "}
						{hotelAddress.state} {hotelAddress.zipcode}
					</Grid>
				</MuiLink>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(styles)(HotelCard));

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const AdminRoomUpdate = () => {
	const [type, setType] = useState("SINGLE");
	const [price, setPrice] = useState();
	const [maximumOccupancy, setMaximumOccupancy] = useState();
	const [totalCount, setTotalCount] = useState();

	const handleUpdateRoom = async (e) => {
		// const hotelId = localStorage.getItem("hotel_id");

		const payload = { price, maximumOccupancy, totalCount };
		// const res = await axios.put(
		// 	`${BASE_API_URL}/rooms/${hotelId}/${type}`,
		// 	{ payload }
		// );

		// console.log(res.data);
	};
	const getRoomTypeDetails = async () => {
		// const hotelId = localStorage.getItem("hotel_id");
		// const res = await axios.get(`${BASE_API_URL}/rooms/${hotelId}/${type}`);
		// console.log(res.data);
		// setMaximumOccupancy(maximumOccupancy);
		// setTotalCount(totalCount);
		// setPrice(price);
	};

	// useEffect(() => {
	// 	getRoomTypeDetails();
	// }, [type]);

	return (
		<div>
			<br />
			<br />
			<Form className="div-wrapper">
				<h2 style={{ marginLeft: "30px" }}>Update Room Details</h2>
				<br />
				<div
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						padding: "30px",
						width: "100%",
						alignContent: "center",
					}}
				>
					<div style={{ width: "40%" }}>
						<img
							style={{
								objectFit: " cover",
								width: "100%",
								height: "100%",
								border: "1px solid black",
							}}
							src={
								"https://www.currentschoolnews.com/wp-content/uploads/2021/05/classic-twin-room-1.jpg"
							}
							alt=""
						/>

						{/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" />
                    </Form.Group> */}
					</div>
					<div style={{ width: "50%" }}>
						<Form.Group>
							<Form.Label as="legend">
								Choose Room Type to update
							</Form.Label>
							<Form.Control
								as="select"
								value={type}
								onChange={(e) => setType(e.target.value)}
								style={{
									height: "100%",
									fontSize: "20px",
									minWidth: "200px",
								}}
							>
								<option value="SINGLE">SINGLE</option>
								<option value="SUITE">SUITE</option>
								<option value="KING">KING</option>
								<option value="QUEEN">QUEEN</option>
							</Form.Control>
						</Form.Group>
						<br />
						<br />
						<br />

						<Form.Group>
							<Form.Label>Price ($)</Form.Label>
							<Form.Control
								className="s-input-main"
								type="number"
								onChange={(e) => e.target.value}
								value={price}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Max Occupancy</Form.Label>
							<Form.Control
								className="s-input-main"
								type="number"
								onChange={(e) => e.target.value}
								min={1}
								max={5}
								value={maximumOccupancy}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Number of Rooms</Form.Label>
							<Form.Control
								className="s-input-main"
								type="number"
								onChange={(e) => e.target.value}
								value={totalCount}
								min={1}
								max={5}
							/>
						</Form.Group>

						<div className="buttons-wrapper">
							<Button
								variant="primary"
								size="lg"
								type="submit"
								onClick={handleUpdateRoom}
							>
								Update Room
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default AdminRoomUpdate;

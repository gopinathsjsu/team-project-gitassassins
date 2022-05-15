import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const AdminRoomUpdate = () => {
	const [type, setType] = useState("SINGLE");
	const [price, setPrice] = useState();
	const [maximumOccupancy, setMaximumOccupancy] = useState();
	const [totalCount, setTotalCount] = useState();
	const [imageUrl, setImageUrl] = useState();
	const [roomId, setRoomId] = useState();

	const handleUpdateRoom = async (e) => {
		const payload = {
			roomId: roomId,
			price: price,
			maximumOccupancy: maximumOccupancy,
			totalCount: totalCount,
		};
		const response = await axios.put(`/room/update/`, payload);
		console.log(response.data);
	};

	const getRoomTypeDetails = async () => {
		console.log("About to fetch deets");
		const hotelId = localStorage.getItem("hotelId");
		console.log("Hotel Id => ", hotelId);
		const res = await axios.get(`/room/${hotelId}/${type}`);
		const data = res.data[0];

		const maximumOccupancy = data.maximumOccupancy;
		const totalCount = data.totalCount;
		const price = data.price;
		const imageUrl = data.photoUrl;
		const roomId = data._id;

		setMaximumOccupancy(maximumOccupancy);
		setTotalCount(totalCount);
		setPrice(price);
		setImageUrl(imageUrl);
		setRoomId(roomId);
	};

	useEffect(() => {
		getRoomTypeDetails();
	}, [type]);

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
							src={imageUrl}
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
								onChange={(e) => setPrice(e.target.value)}
								value={price}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>Max Occupancy</Form.Label>
							<Form.Control
								className="s-input-main"
								type="number"
								onChange={(e) =>
									setMaximumOccupancy(e.target.value)
								}
								min={1}
								max={5}
								value={maximumOccupancy}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>Number of Rooms</Form.Label>
							<Form.Control
								className="s-input-main"
								type="number"
								onChange={(e) => setTotalCount(e.target.value)}
								value={totalCount}
								min={1}
								max={5}
							/>
						</Form.Group>
						<br />
						<div className="buttons-wrapper">
							<Button
								variant="primary"
								size="lg"
								type="button"
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

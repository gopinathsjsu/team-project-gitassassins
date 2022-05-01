import express from "express";
import { HotelService } from "../service/HotelService.js";

const hotelController = express.Router();
const hotelService = new HotelService();

hotelController.post("/hotel/create", hotelService.create);
hotelController.get("/hotel/getAll", hotelService.fetchHotels);
hotelController.get("/hotel/get/:hotelId", hotelService.fetchHotelById);
hotelController.get(
	"/hotel/search/:location",
	hotelService.searchHotelByLocation
);

export default hotelController;

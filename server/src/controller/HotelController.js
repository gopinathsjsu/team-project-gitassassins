import express from "express";
import { HotelService } from "../service/HotelService.js";

export const hotelController = express.Router();
const hotelService = new HotelService();

hotelController.post("/hotel/create", hotelService.create);
hotelController.post("/hotel/login", hotelService.validateLogin);
hotelController.get("/hotel/getAll", hotelService.fetchHotels);
hotelController.get("/hotel/get/:hotelId", hotelService.fetchHotelById);
hotelController.get(
	"/hotel/search/:location",
	hotelService.searchHotelByLocation
);
hotelController.put(
	"/hotel/update-amenities",
	hotelService.updateAmenitiesPrice
);

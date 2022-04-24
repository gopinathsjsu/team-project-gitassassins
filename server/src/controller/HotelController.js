import express from "express";
import HotelService from "../service/HotelService.js";

const hotelController = express.Router();
const hotelService = new HotelService();

hotelController.post("/hotel/createHotel", hotelService.create);
hotelController.get("/hotel/getLocations", hotelService.get_location);
hotelController.get("/hotel/search", hotelService.search);


export default hotelController;

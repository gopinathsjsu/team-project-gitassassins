import express from "express";
import HotelService from "../service/HotelService.js";

const hotelController = express.Router();
const hotelService = new HotelService();

hotelController.post("/hotel/createHotel", hotelService.create);


export default hotelController;

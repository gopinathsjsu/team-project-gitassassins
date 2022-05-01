import express from "express";
import RoomService from "../service/RoomService.js";

const roomController = express.Router();
const roomService = new RoomService();

roomController.post("/room/create", roomService.create);

export default roomController;

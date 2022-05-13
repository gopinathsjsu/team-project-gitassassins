import express from "express";
import { RoomService } from "../service/RoomService.js";

export const roomController = express.Router();
const roomService = new RoomService();

roomController.post("/room/create", roomService.create);
roomController.get("/room/search", roomService.searchRoomAvailability);
roomController.put("/room/update", roomService.update);

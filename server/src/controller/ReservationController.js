import express from "express";
import { ReservationService } from "../service/ReservationService.js";

export const reservationController = express.Router();
const reservationService = new ReservationService();

reservationController.post("/reservation/reserve", reservationService.create);

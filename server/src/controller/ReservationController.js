import express from "express";
import { ReservationService } from "../service/ReservationService.js";

export const reservationController = express.Router();
const reservationService = new ReservationService();

reservationController.post("/reservation/reserve", reservationService.create);
reservationController.get("/reservation/hotel/fetchAll/:hotelId", reservationService.fetchAllReservationsByHotel);
reservationController.get("/reservation/hotel/fetchActive/:hotelId", reservationService.fetchActiveReservationByHotel);
reservationController.get("/reservation/customer/fetchAll/:customerId", reservationService.fetchAllReservationsByCustomer);
reservationController.get("/reservation/customer/fetchActive/:customerId", reservationService.fetchActiveReservationByCustomer);
reservationController.put("/reservation/customer/update/:customerId/:reservationId", reservationService.updateReservation);
reservationController.put("/reservation/customer/cancel/:customerId/:reservationId", reservationService.cancelReservation);






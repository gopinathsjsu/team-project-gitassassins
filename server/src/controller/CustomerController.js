import express from "express";
import { CustomerService } from "../service/CustomerService.js";

export const customerController = express.Router();
const customerService = new CustomerService();

customerController.post("/customer/create", customerService.create);
customerController.get(
	"/customer/get/:customerId",
	customerService.fetchCustomerById
);
customerController.post("/customer/login", customerService.validateLogin);
customerController.get(
	"/customer/loyalty/:customerId",
	customerService.computeLoyaltyDiscount
);

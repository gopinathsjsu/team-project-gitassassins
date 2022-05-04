import express from "express";
import userService from "../service/userService.js";

const userController = express.Router();
const userService = new userService();

userController.post("/user/userLogin", userService.login);


export default userController;


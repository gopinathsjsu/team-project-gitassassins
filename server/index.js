import mongoInit from "./utils/mongoInit.js";

import app from "./app.js";

import { customerController } from "./src/controller/CustomerController.js";
import { hotelController } from "./src/controller/hotelController.js";
import { roomController } from "./src/controller/RoomController.js";

mongoInit();

app.use(customerController);
app.use(hotelController);
app.use(roomController);

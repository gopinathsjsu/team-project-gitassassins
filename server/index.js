import mongoInit from "./utils/mongoInit.js";
import app from "./app.js";

import { customerController } from "./src/controller/CustomerController.js";
import { hotelController } from "./src/controller/HotelController.js";
import { roomController } from "./src/controller/RoomController.js";
import { reservationController } from "./src/controller/ReservationController.js";

mongoInit();

app.use(customerController);
app.use(hotelController);
app.use(roomController);
app.use(reservationController);

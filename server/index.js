import mongoInit from './utils/mongoInit.js'

import app from './app.js'


import hotelController from './src/controller/hotelController.js'
import userController from './src/controller/userController.js'


mongoInit();

app.use(hotelController);

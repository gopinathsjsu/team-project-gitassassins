import mongoInit from './utils/mongoInit.js'

import app from './app.js'


import hotelController from './src/controller/hotelController.js'


mongoInit();

app.use(hotelController);

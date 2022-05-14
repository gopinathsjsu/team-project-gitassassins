import express from "express";
import cors from "cors";

// import {
//   frontendIP,
//   frontendPort,
// } from "./utils/config.js";

const app = express();
app.use(
  cors({ origin: `http://localhost:3002`, credentials: true })
);


app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);




export default app;
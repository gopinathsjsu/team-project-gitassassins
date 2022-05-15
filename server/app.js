import express from "express";
import cors from "cors";
import config from "../server/utils/config.js";

const app = express();
app.use(cors({ origin: config.frontendURL, credentials: true }));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

export default app;

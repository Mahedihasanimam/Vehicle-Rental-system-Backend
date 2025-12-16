import express from "express";
import config from "./config/config";
import { initDB } from "./database/db";

const app = express();

app.use(express.json());

initDB();

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});

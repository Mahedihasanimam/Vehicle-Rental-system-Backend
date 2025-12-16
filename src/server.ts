import express from "express";
import config from "./config/config";
import { initDB } from "./database/db";
import { authRoute } from "./modules/Authentication/auth.route";
import { vehicleRoute } from "./modules/Vehicles/vehicles.route";

const app = express();

app.use(express.json());

initDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/vehicles", vehicleRoute);

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});

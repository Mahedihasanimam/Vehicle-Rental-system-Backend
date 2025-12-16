import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router();
route.post("/", vehicleController.createvehicleINDB);
route.get("/", vehicleController.getAllvehiclesFromDB);
route.get("/:vehicleId", vehicleController.getsingleVehicles);

export const vehicleRoute = route;

import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router();
route.post("/", vehicleController.createvehicleINDB);
route.get("/", vehicleController.getAllvehiclesFromDB);
route.get("/:vehicleId", vehicleController.getsingleVehicles);
route.put("/:vehicleId", vehicleController.updatevehiclefromController);
route.delete("/:vehicleId", vehicleController.deletevehiclefromController);

export const vehicleRoute = route;

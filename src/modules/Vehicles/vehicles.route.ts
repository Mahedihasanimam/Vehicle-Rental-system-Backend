import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const route = Router();
route.post("/", auth("admin"), vehicleController.createvehicleINDB);
route.get("/", vehicleController.getAllvehiclesFromDB);
route.get("/:vehicleId", vehicleController.getsingleVehicles);
route.put(
  "/:vehicleId",
  auth("admin"),
  vehicleController.updatevehiclefromController
);
route.delete(
  "/:vehicleId",
  auth("admin"),
  vehicleController.deletevehiclefromController
);

export const vehicleRoute = route;

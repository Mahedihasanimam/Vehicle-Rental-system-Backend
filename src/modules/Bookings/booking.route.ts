import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const route = Router();
route.post("/", auth("admin", "customer"), bookingController.createbookingINDB);
route.get(
  "/",
  auth("admin", "customer"),
  bookingController.getAllbookingsFromDB
);
route.put("/:bookingId", bookingController.updatebookingfromController);
export const bookingRoute = route;

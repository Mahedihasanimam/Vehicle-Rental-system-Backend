import { Router } from "express";
import { bookingController } from "./booking.controller";

const route = Router();
route.post("/", bookingController.createbookingINDB);
route.get("/", bookingController.getAllbookingsFromDB);
route.put("/:bookingId", bookingController.updatebookingfromController);
export const bookingRoute = route;

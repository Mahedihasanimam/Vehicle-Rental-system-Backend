import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import adminOrOwner from "../../middleware/adminOrOwner";

const route = Router();
route.get("/", auth("admin"), userController.getalluserFromController);
route.put(
  "/:userId",
  auth("admin", "customer"),
  adminOrOwner,
  userController.updateAuserController
);
route.delete(
  "/:userId",
  auth("admin"),
  userController.deleteuserfromController
);

export const userRoute = route;

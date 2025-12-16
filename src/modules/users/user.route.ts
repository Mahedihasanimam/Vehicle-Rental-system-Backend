import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();
route.get("/", userController.getalluserFromController);
route.put("/:userId", userController.updateAuserController);
route.delete("/:userId", userController.deleteuserfromController);

export const userRoute = route;

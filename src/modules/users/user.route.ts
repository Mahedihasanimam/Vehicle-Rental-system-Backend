import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = Router();
route.get("/", auth(), userController.getalluserFromController);
route.put("/:userId", userController.updateAuserController);
route.delete("/:userId", userController.deleteuserfromController);

export const userRoute = route;

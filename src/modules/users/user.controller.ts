import { Request, Response } from "express";
import { userService } from "./user.service";

const getalluserFromController = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      message:
        result.length > 0 ? "users retrieved successfully" : "No users found",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updateAuserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const loggedInUser = req.user;

    if (loggedInUser?.role !== "admin" && loggedInUser?.id !== Number(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this user",
      });
    }

    const result = await userService.updateuserById(userId as string, req.body);
    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
const deleteuserfromController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userService.deleteusersByID({
      userId: userId as string,
    });
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const userController = {
  getalluserFromController,
  updateAuserController,
  deleteuserfromController,
};

import { Request, Response } from "express";
import { authService } from "./auth.service";

const createuserfromController = async (req: Request, res: Response) => {
  try {
    const result = await authService.RegisterDB(req.body);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
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

const getuserFromDB = async (req: Request, res: Response) => {
  try {
    const result = await authService.getuserFromDB(req.body);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: result.token,
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
          phone: result.phone,
          role: result.role,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const authController = {
  signup: createuserfromController,
  login: getuserFromDB,
};

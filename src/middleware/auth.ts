import { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log("token", token);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "You are not allowed",
      });
    }
  };
};

export default auth;

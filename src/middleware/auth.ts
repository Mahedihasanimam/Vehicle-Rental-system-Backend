import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import config from "../config/config";

const auth = (...args: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }
      const decodedToken = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      if (
        decodedToken?.role &&
        args.length > 0 &&
        !args.includes(decodedToken.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to access this resource",
        });
      }

      req.user = decodedToken;
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "You are not allowed",
      });
    }
  };
};

export default auth;

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config/config";

const adminOrOwner = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const { userId } = req.params;

  const token = req.headers.authorization?.split(" ")[1];
  const decodedToken = jwt.verify(
    token as string,
    config.jwtSecret as string
  ) as jwt.JwtPayload;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  if (decodedToken?.role === "admin" || user?.id === Number(userId)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
};

export default adminOrOwner;

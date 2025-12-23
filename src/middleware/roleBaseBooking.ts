import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const roleBaseBooking = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedRole = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (allowedRoles.includes(decodedRole.role)) {
      return next();
    }
  };
};

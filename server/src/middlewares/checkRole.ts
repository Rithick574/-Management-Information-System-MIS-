import { Request, Response, NextFunction } from "express";

interface UserPayload {
  _id: string;
  email: string;
  role: string;
}

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions" });
    }
    next();
  };
};

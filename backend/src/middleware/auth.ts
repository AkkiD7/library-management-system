import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as any;
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

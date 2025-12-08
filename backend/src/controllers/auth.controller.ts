import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({
        status: false,
        message: "Username already exists",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = generateToken({
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

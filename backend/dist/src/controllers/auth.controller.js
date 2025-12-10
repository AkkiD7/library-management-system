"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const generateToken_1 = require("../utils/generateToken");
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existing = await User_1.User.findOne({ username });
        if (existing) {
            return res.status(409).json({
                status: false,
                message: "Username already exists",
                data: null,
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.User.create({
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
    }
    catch (error) {
        console.error("Register error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials",
                data: null,
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials",
                data: null,
            });
        }
        const token = (0, generateToken_1.generateToken)({
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
    }
    catch (error) {
        console.error("Login error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map
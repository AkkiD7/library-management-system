"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdminUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdminUser = async () => {
    const existingAdmin = await User_1.User.findOne({ role: "admin" });
    if (existingAdmin)
        return;
    const hashed = await bcryptjs_1.default.hash("Admin@123", 10);
    await User_1.User.create({
        username: "admin",
        password: hashed,
        role: "admin",
    });
    console.log("Admin user created: username=admin, password=Admin@123");
};
exports.seedAdminUser = seedAdminUser;
//# sourceMappingURL=seedAdmin.js.map
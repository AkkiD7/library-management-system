"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .nonempty("Username is required")
        .min(3, "Username must be at least 3 characters long"),
    password: zod_1.z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(["admin", "user"]).optional(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty("Username is required"),
    password: zod_1.z.string().nonempty("Password is required"),
});
//# sourceMappingURL=auth.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookStatusBodySchema = exports.bookIdParamSchema = exports.updateBookBodySchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
const currentYear = new Date().getFullYear();
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty("Title is required"),
    author: zod_1.z.string().nonempty("Author is required"),
    publishedYear: zod_1.z.coerce
        .number()
        .int("Published year must be an integer")
        .min(1000, "Published year must be greater than or equal to 1000")
        .max(currentYear, "Published year cannot be in the future"),
    status: zod_1.z
        .enum(["available", "borrowed"])
        .optional()
        .default("available"),
});
exports.updateBookBodySchema = exports.createBookSchema.partial();
exports.bookIdParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .length(24, "Invalid book id"),
});
exports.updateBookStatusBodySchema = zod_1.z.object({
    status: zod_1.z.enum(["available", "borrowed"], {}),
});
//# sourceMappingURL=book.schema.js.map
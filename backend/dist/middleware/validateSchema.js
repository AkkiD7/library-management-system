"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, part = "body") => (req, res, next) => {
    const data = req[part];
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        return res.status(400).json({
            message: "Validation failed",
            errors,
        });
    }
    req[part] = result.data;
    next();
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateSchema_1 = require("../middleware/validateSchema");
const auth_schema_1 = require("../schemas/auth.schema");
const router = (0, express_1.Router)();
router.post("/register", (0, validateSchema_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/login", (0, validateSchema_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
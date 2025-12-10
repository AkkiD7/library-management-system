"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const auth_1 = require("../middleware/auth");
const role_1 = require("../middleware/role");
const validateSchema_1 = require("../middleware/validateSchema");
const book_schema_1 = require("../schemas/book.schema");
const router = (0, express_1.Router)();
router.get("/", auth_1.authMiddleware, book_controller_1.getBooks);
router.post("/", auth_1.authMiddleware, (0, role_1.allowRoles)("admin"), (0, validateSchema_1.validateSchema)(book_schema_1.createBookSchema, "body"), book_controller_1.createBook);
router.put("/:id", auth_1.authMiddleware, (0, role_1.allowRoles)("admin"), (0, validateSchema_1.validateSchema)(book_schema_1.bookIdParamSchema, "params"), (0, validateSchema_1.validateSchema)(book_schema_1.updateBookBodySchema, "body"), book_controller_1.updateBook);
router.delete("/:id", auth_1.authMiddleware, (0, role_1.allowRoles)("admin"), (0, validateSchema_1.validateSchema)(book_schema_1.bookIdParamSchema, "params"), book_controller_1.deleteBook);
router.patch("/:id/status", auth_1.authMiddleware, (0, role_1.allowRoles)("admin", "user"), (0, validateSchema_1.validateSchema)(book_schema_1.bookIdParamSchema, "params"), (0, validateSchema_1.validateSchema)(book_schema_1.updateBookStatusBodySchema, "body"), book_controller_1.updateBookStatus);
exports.default = router;
//# sourceMappingURL=book.routes.js.map
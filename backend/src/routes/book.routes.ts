import { Router } from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  updateBookStatus,
} from "../controllers/book.controller";
import { authMiddleware } from "../middleware/auth";
import { allowRoles } from "../middleware/role";
import { validateSchema } from "../middleware/validateSchema";
import {
  createBookSchema,
  updateBookBodySchema,
  bookIdParamSchema,
  updateBookStatusBodySchema,
} from "../schemas/book.schema";

const router = Router();

router.get("/", authMiddleware, getBooks);

router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  validateSchema(createBookSchema, "body"),
  createBook
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  validateSchema(bookIdParamSchema, "params"),
  validateSchema(updateBookBodySchema, "body"),
  updateBook
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  validateSchema(bookIdParamSchema, "params"),
  deleteBook
);

router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles("admin","user"),
  validateSchema(bookIdParamSchema, "params"),
  validateSchema(updateBookStatusBodySchema, "body"),
  updateBookStatus
);

export default router;

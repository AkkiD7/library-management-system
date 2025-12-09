import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createBookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  author: z.string().nonempty("Author is required"),
  publishedYear: z.coerce
    .number()
    .int("Published year must be an integer")
    .min(1000, "Published year must be greater than or equal to 1000")
    .max(currentYear, "Published year cannot be in the future"),

  status: z
    .enum(["available", "borrowed"])
    .optional()
    .default("available"),
});

export const updateBookBodySchema = createBookSchema.partial();

export const bookIdParamSchema = z.object({
  id: z
    .string()
    .length(24, "Invalid book id"), 
});

export const updateBookStatusBodySchema = z.object({
  status: z.enum(["available", "borrowed"], {
  }),
});

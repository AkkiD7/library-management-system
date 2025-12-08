import { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

type RequestPart = "body" | "params" | "query";

export const validateSchema = (schema: ZodType<any>, part: RequestPart = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
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

    (req as any)[part] = result.data;

    next();
  };


import { z } from "zod";

export const problemQuerySchema = z.object({
  search: z.string()
    .trim()
    .max(100, "Search must not exceed 100 characters")
    .optional(),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"])
    .optional(),

  topic: z.string()
    .trim()
    .max(50, "Topic must not exceed 50 characters")
    .optional(),

  page: z.coerce.number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .default(1),

  limit: z.coerce.number()
    .int("Limit must be an integer")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(20),
});

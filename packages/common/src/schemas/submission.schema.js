import { z } from "zod";

export const createSubmissionSchema = z
  .object({
    problemSlug: z
      .string()
      .trim()
      .min(1, "Problem slug is required")
      .max(160, "Problem slug cannot exceed 160 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid problem slug format",
      ),

    language: z.enum(["java", "python", "cpp", "javascript"]),

    sourceCode: z
      .string()
      .min(1, "Source code cannot be empty")
      .max(65536, "Source code cannot exceed 64 KB"),
  })
  .strict();

export const submissionIdParamSchema = z.object({
  id: z.string().min(1, "Submission ID is required"),
});

export const submissionHistoryQuerySchema = z
  .object({
    problemSlug: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .optional(),

    cursor: z
      .string()
      .trim()
      .min(1, "Cursor cannot be empty")
      .max(100, "Cursor must not exceed 100 characters")
      .optional(),

    limit: z.coerce
      .number()
      .int("Limit must be an integer")
      .min(1, "Limit must be at least 1")
      .max(50, "Limit cannot exceed 50")
      .default(10),
  })
  .strict();

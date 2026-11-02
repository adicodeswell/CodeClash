import { Router } from "express";
import { problemQuerySchema, problemSlugParamSchema } from "@codeclash/common";

import { validateQuery, validateParams } from "../middleware/validate.js";
import { getProblems, getProblemDetail } from "../controllers/problems.controller.js";

const router = Router();

router.get("/", validateQuery(problemQuerySchema), getProblems);
router.get("/:slug", validateParams(problemSlugParamSchema), getProblemDetail);

export default router;

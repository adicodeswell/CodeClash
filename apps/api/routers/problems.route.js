import { Router } from "express";
import { problemQuerySchema, problemSlugParamSchema } from "@codeclash/common";

import { requireAuth } from "../middleware/requireAuth.js";
import { validateQuery, validateParams } from "../middleware/validate.js";
import { getProblems, getProblemDetail } from "../controllers/problems.controller.js";

const router = Router();

// Protect all problem routes: user must be authenticated
router.use(requireAuth);

router.get("/", validateQuery(problemQuerySchema), getProblems);
router.get("/:slug", validateParams(problemSlugParamSchema), getProblemDetail);

export default router;

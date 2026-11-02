
import { Router } from "express";
import { problemQuerySchema } from "@codeclash/common";

import { validateQuery } from "../middleware/validate.js";
import { getProblems } from "../controllers/problems.controller.js";

const router = Router();

router.get(
  "/",
  validateQuery(problemQuerySchema),
  getProblems
);

export default router;

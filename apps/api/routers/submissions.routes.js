import { Router } from "express";

import * as submissionsController from "../controllers/submission.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody, validateParams } from "../middleware/validate.js";

import {
  createSubmissionSchema,
  submissionIdParamSchema,
} from "@codeclash/common";

const router = Router();

// All routes in this router require authentication.
router.use(requireAuth);

// POST / — Create a submission.
router.post(
  "/",
  validateBody(createSubmissionSchema),
  submissionsController.submitCode,
);

// POST /run — Synchronously run code against sample test cases.
router.post(
  "/run",
  validateBody(createSubmissionSchema),
  submissionsController.runCode,
);

// GET /:id — Retrieve a submission's sanitized status.
router.get(
  "/:id",
  validateParams(submissionIdParamSchema),
  submissionsController.getSubmission,
);

export default router;

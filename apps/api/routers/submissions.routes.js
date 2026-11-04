import { Router } from "express";

import * as submissionsController from "../controllers/submission.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";

import {
  createSubmissionSchema,
  submissionIdParamSchema,
  submissionHistoryQuerySchema,
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

// GET /me — Retrieve paginated submission history for the authenticated user.
router.get(
  "/me",
  validateQuery(submissionHistoryQuerySchema),
  submissionsController.getMySubmissions,
);

// GET /:id — Retrieve a submission's sanitized status.
router.get(
  "/:id",
  validateParams(submissionIdParamSchema),
  submissionsController.getSubmission,
);

export default router;

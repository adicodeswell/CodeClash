import { Router } from "express";
import {
  signup,
  login,
  me,
  logout,
  heartbeat,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";
import { signupLimiter, loginLimiter } from "../middleware/rate-limit.js";
import { signupSchema, loginSchema } from "@codeclash/common";

const router = Router();

router.post("/signup", signupLimiter, validateBody(signupSchema), signup);
router.post("/login", loginLimiter, validateBody(loginSchema), login);
router.get("/me", requireAuth, me);
router.post("/heartbeat", requireAuth, heartbeat);
router.post("/logout", logout);

export default router;

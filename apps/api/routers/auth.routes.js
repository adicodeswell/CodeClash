
import { Router } from "express";
import {
  signup,
  login,
  me,
  logout,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";
import { signupSchema, loginSchema } from "@codeclash/common";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;

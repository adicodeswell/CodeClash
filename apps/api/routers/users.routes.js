import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getMyProgress } from "../controllers/users.controller.js";

const router = Router();

// All user routes require authentication
router.use(requireAuth);

// GET /api/users/me/progress
router.get("/me/progress", getMyProgress);

export default router;

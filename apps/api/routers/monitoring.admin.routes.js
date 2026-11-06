import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  getOverview,
  getHealth,
  getWorkers,
  getErrors,
  getMetrics,
  getUsers,
} from "../controllers/monitoring.admin.controller.js";

const router = Router();

// Protect all admin monitoring routes with authentication and role check
router.use(requireAuth, requireAdmin);

router.get("/overview", getOverview);
router.get("/health", getHealth);
router.get("/workers", getWorkers);
router.get("/errors", getErrors);
router.get("/metrics", getMetrics);
router.get("/users", getUsers);

export default router;

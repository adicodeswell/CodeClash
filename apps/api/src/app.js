import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Middleware
import requestId from "../middleware/requestId.js";
import metricsCollector from "../middleware/metricsCollector.js";
import notFound from "../middleware/notFound.js";
import errorHandler from "../middleware/errorHandler.js";

// Routes
import authRoutes from "../routers/auth.routes.js";
import problemRouter from "../routers/problems.route.js";
import submissionsRouter from "../routers/submissions.routes.js";
import usersRoutes from "../routers/users.routes.js";
import adminMonitoringRoutes from "../routers/monitoring.admin.routes.js";

const app = express();

app.use(requestId);
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "128kb" }));
app.use(cookieParser());
app.use(metricsCollector);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Code Clash API is running",
  });
});

// Internal test error trigger endpoint (active in test/dev environments)
if (process.env.NODE_ENV !== "production") {
  app.get("/api/test/force-500", (req, res, next) => {
    const error = new Error("Simulated internal server error for monitoring verification");
    error.status = 500;
    next(error);
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/users", usersRoutes);
app.use("/api/admin/monitoring", adminMonitoringRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

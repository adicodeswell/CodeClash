import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


// Middleware
import notFound from "../middleware/notFound.js";
import errorHandler from "../middleware/errorHandler.js";

// Database
// import { prisma } from "@codeclash/db";

// Routes
import authRoutes from "../routers/auth.routes.js";
import problemRouter from "../routers/problems.route.js";
import submissionsRouter from "../routers/submissions.routes.js";


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "128kb" }));
app.use(cookieParser())

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Code Clash API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRouter);
app.use("/api/submissions", submissionsRouter);

// Temporary Prisma Client test
// app.get("/api/prisma-test", async (req, res, next) => {
//   try {
//     const users = await prisma.user.findMany();

//     res.status(200).json({
//       success: true,
//       message: "Prisma Client is working",
//       userCount: users.length,
//       users,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

app.use(notFound);
app.use(errorHandler);

export default app;
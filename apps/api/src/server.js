
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load monorepo root .env first, then local .env if present
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5003;

const server = app.listen(PORT, () => {
  console.log(`Code Clash API running at http://localhost:${PORT}`);

  // When deployed on free hosting (without a paid dedicated background worker),
  // setting START_WORKER=true launches the judge worker as a background child process.
  if (process.env.START_WORKER === "true") {
    try {
      const workerPath = path.resolve(__dirname, "../../judge-worker/src/worker.js");
      const workerChild = fork(workerPath, {
        env: {
          ...process.env,
          WORKER_ID: process.env.WORKER_ID || "judge-worker-primary",
        },
      });

      console.log(`[server] Embedded judge worker started (PID: ${workerChild.pid})`);

      workerChild.on("exit", (code, signal) => {
        console.warn(`[server] Embedded worker exited with code ${code} (${signal})`);
      });

      const cleanShutdown = (signal) => {
        workerChild.kill(signal);
        server.close(() => process.exit(0));
      };

      process.once("SIGTERM", () => cleanShutdown("SIGTERM"));
      process.once("SIGINT", () => cleanShutdown("SIGINT"));
    } catch (err) {
      console.error("[server] Failed to spawn embedded judge worker:", err.message);
    }
  }
});

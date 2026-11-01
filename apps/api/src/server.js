
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load monorepo root .env first, then local .env if present
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Code Clash API running at http://localhost:${PORT}`);
});

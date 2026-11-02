import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

import app from "../src/app.js";

export async function createTestContext() {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const port = server.address().port;
      const baseUrl = `http://127.0.0.1:${port}`;

      try {
        // Log in with test user to obtain session cookie
        const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "adi.test@example.com",
            password: "TestPassword123!",
          }),
        });

        const cookieHeader = loginRes.headers.get("set-cookie");
        let authCookie = "";
        if (cookieHeader) {
          authCookie = cookieHeader.split(";")[0];
        }

        const fetchAuth = async (endpoint, options = {}) => {
          const headers = { ...options.headers };
          if (authCookie) {
            headers.cookie = authCookie;
          }
          return fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers,
          });
        };

        resolve({
          server,
          baseUrl,
          authCookie,
          fetchAuth,
          close: () => new Promise((res) => server.close(res)),
        });
      } catch (err) {
        server.close();
        reject(err);
      }
    });
  });
}

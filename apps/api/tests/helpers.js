import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { prisma } from "@codeclash/db";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

import app from "../src/app.js";

const JWT_SECRET = process.env.JWT_SECRET || "replace-with-a-long-random-secret";

export function createAuthCookie(userId, role = "USER") {
  const token = jwt.sign(
    { sub: userId, role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return `token=${token}`;
}

export async function ensureTestUsers() {
  let userA = await prisma.user.findUnique({
    where: { emailNormalized: "adi.test@example.com" },
  });
  if (!userA) {
    userA = await prisma.user.create({
      data: {
        username: "adi_test_user",
        emailNormalized: "adi.test@example.com",
        passwordHash: "$argon2id$v=19$m=65536,t=3,p=4$fakeHashForTests",
      },
    });
  }

  let userB = await prisma.user.findUnique({
    where: { emailNormalized: "adi.test.b@example.com" },
  });
  if (!userB) {
    userB = await prisma.user.create({
      data: {
        username: "adi_test_user_b",
        emailNormalized: "adi.test.b@example.com",
        passwordHash: "$argon2id$v=19$m=65536,t=3,p=4$fakeHashForTests",
      },
    });
  }

  return { userA, userB };
}

export async function createTestContext() {
  const { userA, userB } = await ensureTestUsers();

  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const port = server.address().port;
      const baseUrl = `http://127.0.0.1:${port}`;

      try {
        const authCookieA = createAuthCookie(userA.id, "USER");
        const authCookieB = createAuthCookie(userB.id, "USER");
        const adminCookie = createAuthCookie(userA.id, "ADMIN");

        const makeFetch = (cookie) => async (endpoint, options = {}) => {
          const headers = { ...options.headers };
          if (cookie) {
            headers.cookie = cookie;
          }
          return fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers,
          });
        };

        const fetchAuth = makeFetch(authCookieA);
        const fetchUserA = makeFetch(authCookieA);
        const fetchUserB = makeFetch(authCookieB);
        const fetchAdmin = makeFetch(adminCookie);
        const fetchUnauth = async (endpoint, options = {}) => {
          return fetch(`${baseUrl}${endpoint}`, options);
        };

        resolve({
          server,
          baseUrl,
          userA,
          userB,
          authCookie: authCookieA,
          authCookieA,
          authCookieB,
          adminCookie,
          fetchAuth,
          fetchUserA,
          fetchUserB,
          fetchAdmin,
          fetchUnauth,
          close: () => new Promise((res) => server.close(res)),
        });
      } catch (err) {
        server.close();
        reject(err);
      }
    });
  });
}


import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === "string" || !payload.sub) {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

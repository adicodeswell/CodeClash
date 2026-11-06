import crypto from "node:crypto";

export default function requestId(req, res, next) {
  const reqId = req.headers["x-request-id"] || crypto.randomUUID();
  req.id = String(reqId);
  res.setHeader("x-request-id", req.id);
  next();
}

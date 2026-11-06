import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "@codeclash/db";

const JWT_SECRET = process.env.JWT_SECRET

export async function signup(req, res, next) {
  try {
    const { username, email, password } =
      res.locals.validatedBody;

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        emailNormalized: email,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        emailNormalized: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Username or email is already taken",
      });
    }

    next(error);
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = res.locals.validatedBody;

    const user = await prisma.user.findUnique({
      where: { emailNormalized: email },
    });

    // Same error for unknown email and incorrect password.
    if (!user || !(await argon2.verify(user.passwordHash, password))) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.emailNormalized,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        emailNormalized: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.emailNormalized,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}

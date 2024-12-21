import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/home-model";

dotenv.config();

export async function Verification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token format");
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined");
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }
    next();
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: error,
      data: {},
    });
  }
}

// Middleware untuk memverifikasi peran admin
export function VerifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({
        status: "failed",
        message: "Authorization header is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).send({
        status: "failed",
        message: "Invalid token format",
      });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      res.status(500).send({
        status: "failed",
        message: "SECRET_KEY is not defined",
      });
      return;
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    User.findOne({ _id: decoded._id, "tokens.token": token })
      .then((user) => {
        if (!user || user.role !== "ADMIN") {
          res.status(403).send({
            status: "failed",
            message: "Access denied: Admins only",
          });
          return;
        }

        // Jika semuanya valid, lanjutkan ke route berikutnya
        next();
      })
      .catch((error) => {
        res.status(500).send({
          status: "failed",
          message: "Internal server error",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(403).send({
      status: "failed",
      message: "Access denied",
      error: (error as Error).message,
    });
  }
}
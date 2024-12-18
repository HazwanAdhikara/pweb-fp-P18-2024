import { Router } from "express";

export const authRouter = Router();

import { Login } from "../controller/home-controller";

authRouter.post("/", Login);

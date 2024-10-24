import { Router } from "express";
import { login, logout } from "../controllers/authControllet";

const router = Router();

router.route("/").post(login).get(logout);

export { router as authRoutes };

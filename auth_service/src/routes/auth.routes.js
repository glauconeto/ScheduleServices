import { Router } from "express";
import { register, login, validateToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);

export default router;
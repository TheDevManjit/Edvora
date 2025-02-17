import express from "express";
import { login, logout, signup, purchases, getUserProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/userMiddleware.js"; // Ensure middleware is correct

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/purchases", isAuthenticated, purchases);
router.get("/user/me", isAuthenticated, getUserProfile); // ✅ Fix: Add this route

export default router;

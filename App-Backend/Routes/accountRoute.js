import express from "express";
import { verifyAccount } from "../Controllers/accountController.js";
import { protect } from "../Middlewares/authMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods for account verification
router.post("/verify", protect, verifyAccount);
router.get("/resend-otp");

//HTTP Methods for password reset
router.post("/reset-password");
router.post("/verify-link");

export default router;

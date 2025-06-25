import express from "express";
import {
    bookmarkPlaces,
    bookmarkPosts,
    getBookmarkedPlaces,
    getBookmarkedPosts,
    verifyAccount,
} from "../Controllers/accountController.js";
import { protect } from "../Middlewares/authMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods for account verification
router.post("/verify", protect, verifyAccount);
router.get("/resend-otp");

//HTTP Methods for password reset
router.post("/reset-password");
router.post("/verify-link");

router.post("/bookmark-post", protect, bookmarkPosts);
router.post("/bookmark-place", protect, bookmarkPlaces);

router.get("/get-bookmarked-posts", protect, getBookmarkedPosts);
router.get("/get-bookmarked-places", protect, getBookmarkedPlaces);

export default router;

import express from "express";
import multer from "multer";
import { createPost, getAllPosts } from "../Controllers/postController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { getRelatedPosts } from "../Controllers/postController.js";
import { updatePost } from "../Controllers/postController.js";

//Router init
const router = express.Router();

//Multer configurations
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.get("/get-all-posts", protect, getAllPosts);
router.get("/get-post/:id");
router.post(
    "/create-post",
    protect,
    upload.array("mediaFiles", 10),
    createPost
);
router.put(
    "/update-post/:id",
    protect,
    upload.array("mediaFiles", 10),
    updatePost
);
router.delete("/delete-post/:id");
router.get("/get-related-posts", protect, getRelatedPosts);

//Exports
export default router;

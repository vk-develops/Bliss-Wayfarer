import express from "express";
import multer from "multer";
import {
    createPost,
    deletePost,
    getAllPosts,
    getAPost,
    getRelatedPosts,
    updatePost,
} from "../../Controllers/postController.js";
import { isAdmin, protect } from "../../Middlewares/authMiddleware.js";

//Router init
const router = express.Router();

//Multer configurations
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.get("/get-all-posts", protect, isAdmin, getAllPosts);
router.get("/get-a-post/:id", protect, isAdmin, getAPost);
router.post(
    "/create-post",
    protect,
    isAdmin,
    upload.array("mediaFiles", 10),
    createPost
);
router.put(
    "/update-post/:id",
    protect,
    isAdmin,
    upload.array("mediaFiles", 10),
    updatePost
);
router.delete("/delete-post/:id", protect, isAdmin, deletePost);
router.get("/get-related-posts", protect, isAdmin, getRelatedPosts);

//Exports
export default router;

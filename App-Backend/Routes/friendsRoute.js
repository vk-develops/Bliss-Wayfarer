import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";

//Router init
const router = express.Router();

router.get("/get-all-friends", protect);
router.get("/get-a-friend/:id", protect);
router.post("/send-friend-request/:id", protect);
router.put("/accept-friend-request", protect);
router.delete("/reject-friend-request", protect);
router.get("/remove-friend", protect);

//Exports
export default router;

import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import { getAFriend, getAllFriends } from "../Controllers/friendsController.js";

//Router init
const router = express.Router();

router.get("/get-all-friends", protect, getAllFriends);
router.get("/get-a-friend/:id", protect, getAFriend);
router.post("/send-friend-request/:id", protect);
router.put("/accept-friend-request/:id", protect);
router.delete("/reject-friend-request", protect);
router.get("/remove-friend", protect);

//Exports
export default router;

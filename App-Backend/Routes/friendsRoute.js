import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import {
    acceptFriendRequest,
    getAFriend,
    getAllFriends,
    sendFriendRequest,
} from "../Controllers/friendsController.js";

//Router init
const router = express.Router();

router.get("/get-all-friends", protect, getAllFriends);
router.get("/get-a-friend/:id", protect, getAFriend);
router.post("/send-friend-request/:id", protect, sendFriendRequest);
router.put("/accept-friend-request/:id", protect, acceptFriendRequest);
router.delete("/reject-friend-request", protect);
router.get("/remove-friend", protect);

//Exports
export default router;

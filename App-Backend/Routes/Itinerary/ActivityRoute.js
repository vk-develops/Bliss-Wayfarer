import express from "express";
import { protect } from "../../Middlewares/authMiddleware.js";
import {
    addActivity,
    deleteActivity,
    updateActivity,
} from "../../Controllers/ItineraryActivityController.js";

// router init
const router = express.Router();

router.post("/:id/days/:dayNumber/activities", protect, addActivity);
router.put(
    "/:id/days/:dayNumber/activities/:activityId",
    protect,
    updateActivity
);
router.delete(
    "/:id/days/:dayNumber/activities/:activityId",
    protect,
    deleteActivity
);

export default router;

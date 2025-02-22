import asyncHandler from "express-async-handler";
import Itinerary from "../Models/Itinerary/itineraryModel.js";

const addActivity = asyncHandler(async (req, res) => {
    try {
        const { id, dayNumber } = req.params;
        const { timeSlot, activity } = req.body;

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        const isAdmin = await Itinerary.findOne({
            _id: id,
            admin: req.user._id,
        });

        if (!isAdmin) {
            return res.status(400).json({
                success: false,
                message: "You are not the admin of this itinerary",
            });
        }

        const dayPlan = itinerary.dayPlans.find(
            (day) => day.dayNumber === parseInt(dayNumber)
        );
        if (!dayPlan) {
            return res.status(404).json({ error: "Day plan not found" });
        }

        const timeSlotObj = dayPlan.timeSlots.find(
            (slot) => slot.slot === timeSlot
        );
        if (!timeSlotObj) {
            return res.status(404).json({ error: "Time slot not found" });
        }

        // Validate time conflicts
        const hasTimeConflict = timeSlotObj.activities.some(
            (existingActivity) => {
                const newStart = new Date(`2000-01-01T${activity.startTime}`);
                const newEnd = new Date(`2000-01-01T${activity.endTime}`);
                const existingStart = new Date(
                    `2000-01-01T${existingActivity.startTime}`
                );
                const existingEnd = new Date(
                    `2000-01-01T${existingActivity.endTime}`
                );

                return newStart < existingEnd && newEnd > existingStart;
            }
        );

        if (hasTimeConflict) {
            return res
                .status(400)
                .json({ error: "Time conflict with existing activity" });
        }

        timeSlotObj.activities.push(activity);
        await itinerary.save();

        res.status(200).json({
            success: true,
            message: "Activity added successfully",
            data: itinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const updateActivity = asyncHandler(async (req, res) => {
    try {
        const { id, dayNumber, activityId } = req.params;
        const { timeSlot, updatedActivity } = req.body;

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        const isAdmin = await Itinerary.findOne({
            _id: id,
            admin: req.user._id,
        });

        if (!isAdmin) {
            return res.status(400).json({
                success: false,
                message: "You are not the admin of this itinerary",
            });
        }

        const dayPlan = itinerary.dayPlans.find(
            (day) => day.dayNumber === parseInt(dayNumber)
        );
        if (!dayPlan) {
            return res.status(404).json({ error: "Day plan not found" });
        }

        const timeSlotObj = dayPlan.timeSlots.find(
            (slot) => slot.slot === timeSlot
        );
        if (!timeSlotObj) {
            return res.status(404).json({ error: "Time slot not found" });
        }

        const activityIndex = timeSlotObj.activities.findIndex(
            (activity) => activity._id.toString() === activityId
        );

        if (activityIndex === -1) {
            return res.status(404).json({ error: "Activity not found" });
        }

        // Update the activity
        timeSlotObj.activities[activityIndex] = {
            ...timeSlotObj.activities[activityIndex],
            ...updatedActivity,
        };

        await itinerary.save();
        res.status(200).json({
            success: true,
            message: "Activity updated successfully",
            data: itinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const deleteActivity = asyncHandler(async (req, res) => {
    try {
        const { id, dayNumber, activityId } = req.params;
        const { timeSlot } = req.body;

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        const isAdmin = await Itinerary.findOne({
            _id: id,
            admin: req.user._id,
        });

        if (!isAdmin) {
            return res.status(400).json({
                success: false,
                message: "You are not the admin of this itinerary",
            });
        }

        const dayPlan = itinerary.dayPlans.find(
            (day) => day.dayNumber === parseInt(dayNumber)
        );
        if (!dayPlan) {
            return res.status(404).json({ error: "Day plan not found" });
        }

        const timeSlotObj = dayPlan.timeSlots.find(
            (slot) => slot.slot === timeSlot
        );
        if (!timeSlotObj) {
            return res.status(404).json({ error: "Time slot not found" });
        }

        timeSlotObj.activities = timeSlotObj.activities.filter(
            (activity) => activity._id.toString() !== activityId
        );

        await itinerary.save();

        res.status(200).json({
            success: true,
            message: "Activity deleted successfully",
            data: itinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { addActivity, updateActivity, deleteActivity };

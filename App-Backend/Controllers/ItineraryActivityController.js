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

        // Add the activity with multiple references
        const newActivity = {
            name: activity.name,
            startTime: activity.startTime,
            endTime: activity.endTime,
            references: activity.references || [], // Array of references
            notes: activity.notes,
            estimatedCost: activity.estimatedCost,
        };

        timeSlotObj.activities.push(newActivity);
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

        // Find the activity in any time slot
        let foundActivity = null;
        let sourceTimeSlot = null;
        let targetTimeSlot = null;

        // Find the current location of the activity
        for (const slot of dayPlan.timeSlots) {
            const found = slot.activities.find(
                (act) => act._id.toString() === activityId
            );
            if (found) {
                foundActivity = found;
                sourceTimeSlot = slot;
                break;
            }
        }

        if (!foundActivity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        // Find target time slot
        targetTimeSlot = dayPlan.timeSlots.find(
            (slot) => slot.slot === timeSlot
        );
        if (!targetTimeSlot) {
            return res
                .status(404)
                .json({ error: "Target time slot not found" });
        }

        // Create updated activity object with multiple references
        const updatedActivity = {
            ...foundActivity.toObject(),
            ...activity,
            references: activity.references || foundActivity.references, // Keep existing references if not updated
            _id: foundActivity._id,
        };

        // Update or move the activity
        if (sourceTimeSlot.slot !== targetTimeSlot.slot) {
            sourceTimeSlot.activities = sourceTimeSlot.activities.filter(
                (act) => act._id.toString() !== activityId
            );
            targetTimeSlot.activities.push(updatedActivity);
        } else {
            const activityIndex = sourceTimeSlot.activities.findIndex(
                (act) => act._id.toString() === activityId
            );
            sourceTimeSlot.activities[activityIndex] = updatedActivity;
        }

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

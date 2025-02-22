import asyncHandler from "express-async-handler";
import {
    calculateDays,
    validateDateRange,
} from "../Helper/itineraryHelpers.js";
import Itinerary from "../Models/Itinerary/itineraryModel.js";

const getAllItineraries = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const itineraries = await Itinerary.find({
            $or: [{ admin: userId }, { tripFriends: userId }],
        })
            .populate("admin tripFriends", "name email")
            .populate("comments.user", "name email");

        res.status(200).json({
            success: true,
            message: "Itineraries fetched successfully",
            data: itineraries,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const getAItinerary = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user._id;

        // Find itinerary and populate references
        const itinerary = await Itinerary.findById(id)
            .populate("admin tripFriends", "name email")
            .populate("comments.user", "name email");

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        // Check if the user is either the admin or a trip friend
        const isAuthorized =
            itinerary.admin._id.toString() === userId ||
            itinerary.tripFriends.some(
                (friend) => friend._id.toString() === userId
            );

        if (!isAuthorized) {
            return res.status(403).json({
                message:
                    "Access denied. You are not a member of this itinerary.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Itinerary fetched",
            data: itinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Create Post
// @route   POST /api/v1/itinerary-management/create-itinerary
// @access  Private

const createItinerary = asyncHandler(async (req, res) => {
    try {
        const { tripName, location, startDate, endDate, totalBudget } =
            req.body;

        // Validate dates
        if (!validateDateRange(startDate, endDate)) {
            return res.status(400).json({
                error: "Invalid date range. End date must be after start date.",
            });
        }

        // Calculate number of days
        const numberOfDays = calculateDays(
            new Date(startDate),
            new Date(endDate)
        );

        // Create initial day plans array
        const dayPlans = Array.from({ length: numberOfDays }, (_, i) => ({
            dayNumber: i + 1,
            date: new Date(
                new Date(startDate).setDate(new Date(startDate).getDate() + i)
            ),
            timeSlots: [
                { slot: "morning", activities: [] },
                { slot: "afternoon", activities: [] },
                { slot: "evening", activities: [] },
            ],
        }));

        const newItinerary = new Itinerary({
            tripName,
            location,
            startDate,
            endDate,
            numberOfDays,
            admin: req.user._id,
            totalBudget,
            dayPlans,
        });

        await newItinerary.save();

        res.status(201).json({
            success: true,
            message: "Itinerary creation success",
            data: newItinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Create Post
// @route   POST /api/v1/itinerary-management/update-itinerary/:id
// @access  Private

const updateItinerary = asyncHandler(async (req, res) => {
    try {
        const { timeSlot, activity } = req.body;
        const { id, dayNumber } = req.params;

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        // Validate time slot
        if (!["morning", "afternoon", "evening"].includes(timeSlot)) {
            return res.status(400).json({ error: "Invalid time slot" });
        }

        // Validate activity data
        if (
            !activity.name ||
            !activity.startTime ||
            !activity.endTime ||
            !activity.reference
        ) {
            return res
                .status(400)
                .json({ error: "Missing required activity fields" });
        }

        const isAdmin = await Itinerary.findOne({
            _id: id,
            admin: req.user._id,
        });

        if (!isAdmin) {
            return res.status(400).json({
                success: "false",
                message: "You are not the admin of this itinerary",
            });
        }

        // Find the day plan
        const dayPlan = itinerary.dayPlans.find(
            (day) => day.dayNumber === parseInt(dayNumber)
        );
        if (!dayPlan) {
            return res.status(404).json({ error: "Day plan not found" });
        }

        // Find or create time slot
        let timeSlotObj = dayPlan.timeSlots.find(
            (slot) => slot.slot === timeSlot
        );
        if (!timeSlotObj) {
            dayPlan.timeSlots.push({ slot: timeSlot, activities: [] });
            timeSlotObj = dayPlan.timeSlots[dayPlan.timeSlots.length - 1];
        }

        // Add new activity
        timeSlotObj.activities.push({
            name: activity.name,
            startTime: activity.startTime,
            endTime: activity.endTime,
            reference: {
                type: activity.reference.type,
                referenceId: activity.reference.referenceId,
            },
            notes: activity.notes,
            estimatedCost: activity.estimatedCost,
        });

        await itinerary.save();

        res.status(200).json({
            success: true,
            message: "update success",
            data: itinerary,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { getAItinerary, getAllItineraries, createItinerary, updateItinerary };

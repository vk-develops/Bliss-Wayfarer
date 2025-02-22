import asyncHandler from "express-async-handler";
import {
    calculateDays,
    validateDateRange,
} from "../Helper/itineraryHelpers.js";
import Itinerary from "../Models/Itinerary/itineraryModel.js";

// @desc    Create Post
// @route   POST /api/v1/itinerary-management/itinerary/create-itinerary
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

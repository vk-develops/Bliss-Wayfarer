import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { uploadMediaFiles } from "../../../Helper/uploadMedia.js";
import Attraction from "../../../Models/TravelModels/AttractionModel.js";

// @desc    Send a travel atrraction
// @route   POST /api/v1/admin/travel/get-attraction/:id
// @access  Private(admin)
const getATravelAttraction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid attraction id" });
        }

        const attraction = await Attraction.findById(id);

        if (attraction) {
            //Sending the response
            res.status(200).json({
                success: true,
                message: "Attraction data retrieval success",
                data: attraction,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No travel attractions found",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Send all travel atrraction from db
// @route   POST /api/v1/admin/travel/get-attraction
// @access  Private(admin)
const getAllTravelAttraction = asyncHandler(async (req, res) => {
    try {
        const attractions = await Attraction.find();

        const attractionCount = await Attraction.countDocuments();

        if (attractions.length === 0) {
            // If there are no attractions
            return res.status(404).json({
                success: false,
                message: "No travel attractions available",
            });
        }

        // Sending the response when attractions are found
        res.status(200).json({
            success: true,
            message: "Attractions data retrieval success",
            count: attractionCount,
            data: attractions,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Create Attraction Data
// @route   POST /api/v1/admin/travel/create-attraction
// @access  Private(admin)
const createAttraction = asyncHandler(async (req, res) => {
    try {
        const { name, location, description, lat, long, category, starRating } =
            req.body;

        const mediaFiles = req.files;

        console.log(mediaFiles);

        if (
            !name ||
            !location ||
            !description ||
            !lat ||
            !long ||
            !category ||
            !starRating
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required." });
        }

        if (starRating < 1 || starRating > 5) {
            return res.status(400).json({
                success: false,
                message: "Star rating must be between 1 and 5.",
            });
        }

        let media = [];
        if (mediaFiles && mediaFiles.length > 0) {
            const mediaUrls = await uploadMediaFiles(mediaFiles);
            media = mediaUrls.map((url, index) => ({
                url,
                mediaType: mediaFiles[index].mimetype.startsWith("image")
                    ? "Image"
                    : "Video",
            }));
        }

        //Creating Travel Attraction
        const attraction = new Attraction({
            name,
            location,
            mapLocation: { lat, long },
            description,
            category,
            media,
            starRating,
        });

        const savedAttraction = await attraction.save();

        res.status(201).json({ success: true, data: savedAttraction });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Update Attraction Data
// @route   POST /api/v1/admin/travel/update-attraction/:id
// @access  Private(admin)
const updateTravelAttraction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid attraction id" });
        }

        const {
            name,
            location,
            description,
            lat,
            long,
            category,
            starRating,
            deleteMedia,
        } = req.body;

        const attraction = await Attraction.findById(id);

        if (!attraction) {
            return res
                .status(404)
                .json({ success: false, message: "Attraction not found." });
        }

        const mediaFiles = req.files;
        let updatedMedia = attraction.media;

        // Handle media deletion only in the database
        if (deleteMedia && deleteMedia.length > 0) {
            updatedMedia = updatedMedia.filter(
                (media) => !deleteMedia.includes(media.url)
            );
        }

        // Handle new media uploads
        if (mediaFiles && mediaFiles.length > 0) {
            const mediaUrls = await uploadMediaFiles(mediaFiles);
            const newMedia = mediaUrls.map((url, index) => ({
                url,
                mediaType: mediaFiles[index].mimetype.startsWith("image")
                    ? "Image"
                    : "Video",
            }));
            updatedMedia = [...updatedMedia, ...newMedia];
        }

        // Updating the fields
        attraction.name = name || attraction.name;
        attraction.location = location || attraction.location;
        attraction.description = description || attraction.description;
        attraction.mapLocation = {
            lat: lat || attraction.mapLocation.lat,
            long: long || attraction.mapLocation.long,
        };
        attraction.category = category || attraction.category;
        attraction.starRating = starRating || attraction.starRating;
        attraction.media = updatedMedia;

        const updatedAttraction = await attraction.save();

        res.status(200).json({
            success: true,
            message: "Travel Attraction updation was successfully done",
            data: updatedAttraction,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Delete Attraction Data
// @route   POST /api/v1/admin/travel/delete-attraction/:id
// @access  Private(admin)
const deleteTravelAttraction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid attraction id" });
        }

        const deleteAttraction = await Attraction.findByIdAndDelete(id);

        if (!deleteAttraction) {
            return res.status(404).json({
                success: false,
                message: "Travel Attraction not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Travel Attraction deletion was successfully done",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export {
    createAttraction,
    getATravelAttraction,
    getAllTravelAttraction,
    updateTravelAttraction,
    deleteTravelAttraction,
};

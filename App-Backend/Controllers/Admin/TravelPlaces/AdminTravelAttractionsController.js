import asyncHandler from "express-async-handler";
import { uploadMediaFiles } from "../../../Helper/uploadMedia";
import Attraction from "../../../Models/TravelModels/AttractionModel.js";
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
                .json({ success: false, message: "Invalid product id" });
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

// @desc    Create Attraction Data
// @route   POST /api/v1/admin/travel/create-attraction
// @access  Private(admin)
const createAttraction = asyncHandler(async (req, res) => {
    try {
        const { name, location, description, lat, long, category, starRating } =
            req.body;

        const mediaFiles = req.files;

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

export { createAttraction, getATravelAttraction };

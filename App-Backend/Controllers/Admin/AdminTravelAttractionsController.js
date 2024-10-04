import asyncHandler from "express-async-handler";

// @desc    Create Attraction Data
// @route   POST /api/v1/admin/travel/create-attraction
// @access  Private(admin)

const createAttraction = asyncHandler(async (req, res) => {
    try {
        const { name, location, description } = req.body;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

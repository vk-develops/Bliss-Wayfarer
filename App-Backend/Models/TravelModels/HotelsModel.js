import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    media: [
        {
            url: {
                type: String,
                required: true,
            },
            mediaType: {
                type: String,
                enum: ["Image", "Video"],
                required: true,
            },
        },
    ],
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    travelPlace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelPlace",
    },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;

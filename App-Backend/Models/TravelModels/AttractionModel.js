import mongoose from "mongoose";

const attractionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    mapLocation: {
        lat: {
            type: String,
            required: true,
        },
        long: {
            type: String,
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, //Beaches, Regligious sites, Amusement & Theme park, Shopping Malls, Museums
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

const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;

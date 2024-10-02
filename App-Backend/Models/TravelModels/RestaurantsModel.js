import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
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
    images: [
        {
            type: String,
            required: true,
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

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;

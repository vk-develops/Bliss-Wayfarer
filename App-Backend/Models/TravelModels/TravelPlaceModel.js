import mongoose from "mongoose";

const travelPlaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
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
    attractions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attraction",
        },
    ],
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    ],
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
    ],
    // reviews: [
    //     {

    //     }
    // ]
});

const TravelPlace = mongoose.model("TravelPlace", travelPlaceSchema);
export default TravelPlace;

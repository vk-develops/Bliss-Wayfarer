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
    images: [
        {
            type: String,
            required: true,
        },
    ],
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
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

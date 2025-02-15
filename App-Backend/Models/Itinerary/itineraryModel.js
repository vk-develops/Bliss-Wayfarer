import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tripName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        noOfDays: {
            type: Number,
            required: true,
        },
        tripFriends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        days: [
            {
                dayNumber: Number, // Day 1, Day 2, Day 3...
                activities: [
                    {
                        placeName: String,
                        category: {
                            type: String,
                            enum: [
                                "Sanctuary",
                                "Studio",
                                "Attraction",
                                "Places",
                                "Restaurant",
                            ],
                        },
                        date: Date,
                        time: String,
                    },
                ],
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                text: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        travelCommunityPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to a post from the travel community
        },
    },
    { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;

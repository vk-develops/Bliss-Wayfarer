import mongoose from "mongoose";

// const itinerarySchema = new mongoose.Schema(
//     {
//         admin: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         tripName: {
//             type: String,
//             required: true,
//         },
//         location: {
//             type: String,
//             required: true,
//         },
//         noOfDays: {
//             type: Number,
//             required: true,
//         },
//         tripFriends: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User",
//             },
//         ],
//         days: [
//             {
//                 dayNumber: Number, // Day 1, Day 2, Day 3...
//                 activities: [
//                     {
//                         placeName: String,
//                         category: {
//                             type: String,
//                             enum: [
//                                 "Sanctuary",
//                                 "Studio",
//                                 "Attraction",
//                                 "Places",
//                                 "Restaurant",
//                             ],
//                         },
//                         date: Date,
//                         time: String,
//                     },
//                 ],
//             },
//         ],
//         comments: [
//             {
//                 user: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "User",
//                 },
//                 text: String,
//                 createdAt: {
//                     type: Date,
//                     default: Date.now,
//                 },
//             },
//         ],
//         travelCommunityPost: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post", // Reference to a post from the travel community
//         },
//     },
//     { timestamps: true }
// );

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String, // Format: "HH:mm"
        required: true,
    },
    endTime: {
        type: String, // Format: "HH:mm"
        required: true,
    },

    references: [
        {
            type: {
                type: String,
                enum: ["sanity", "post"],
                required: true,
            },
            referenceId: {
                type: String,
                required: true,
            },
            referenceType: {
                type: String, // For Sanity: 'attraction', 'restaurant', 'hotel'
                required: true,
            },
        },
    ],
    notes: String,
    estimatedCost: Number,
});

const timeSlotSchema = new mongoose.Schema({
    slot: {
        type: String,
        enum: ["morning", "afternoon", "evening", "night"],
        required: true,
    },
    activities: [activitySchema],
});

const dayPlanSchema = new mongoose.Schema({
    dayNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlots: [timeSlotSchema],
    notes: String,
    weatherInfo: String,
});

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const itinerarySchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    numberOfDays: {
        type: Number,
        required: true,
        min: 1,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tripFriends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    dayPlans: [dayPlanSchema],
    status: {
        type: String,
        enum: ["Draft", "Planned", "Ongoing", "Completed"],
        default: "Draft",
    },
    comments: [commentSchema],
    totalBudget: {
        type: Number,
        default: 0,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt timestamp
itinerarySchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Helper method to add an activity to a specific day and time slot
itinerarySchema.methods.addActivity = async function (
    dayNumber,
    timeSlot,
    activityData
) {
    const day = this.dayPlans.find((day) => day.dayNumber === dayNumber);
    if (!day) throw new Error("Day not found");

    let slot = day.timeSlots.find((slot) => slot.slot === timeSlot);
    if (!slot) {
        day.timeSlots.push({ slot: timeSlot, activities: [] });
        slot = day.timeSlots[day.timeSlots.length - 1];
    }

    slot.activities.push(activityData);
    return this.save();
};

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;

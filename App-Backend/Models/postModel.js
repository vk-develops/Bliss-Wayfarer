import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        location: { type: String, required: true },
        category: {
            type: String,
            enum: ["Gem", "Itinerary", "General"],
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
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                text: {
                    type: String,
                    required: true,
                    maxLength: 300,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;

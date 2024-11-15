import mongoose from "mongoose";

//User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    about: {
        type: String,
    },
    phno: {
        type: String,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    friendRequestsSent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    friendRequestsReceived: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    //chats
    unreadMessages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            count: { type: Number, default: 0 },
        },
    ],
});

const User = mongoose.model("User", userSchema);

export default User;

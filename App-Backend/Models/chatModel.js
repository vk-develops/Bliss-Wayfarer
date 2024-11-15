import mongoose from "mongoose";

//Chat Schema
const chatSchema = mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

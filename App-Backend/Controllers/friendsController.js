import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../Models/userModel.js";

// @desc    Get A Friend
// @route   POST /api/v1/users/travel-community/friends/get-a-friend/:id
// @access  Private
const getAFriend = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Check if the friend ID is a valid MongoDB ObjectID
        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid friend ID" });
        }

        // Retrieve the current user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }

        // Check if the friend ID exists in the user's friend list
        const friend = user.friends.find((friend) => friend.toString() === id);

        if (!friend) {
            return res.status(404).json({
                success: false,
                message: "Friend not found in your friend list",
            });
        }

        // Retrieve the friend's data
        const friendData = await User.findById(id).select(
            "name email profilePicture"
        );

        if (!friendData) {
            return res
                .status(404)
                .json({ success: false, message: "Friend data not found" });
        }

        res.status(200).json({
            success: true,
            data: friendData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Get All Friend
// @route   POST /api/v1/users/travel-community/friends/get-all-friends
// @access  Private
const getAllFriends = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        // Retrieve the current user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }

        const friends = await user.friends;
        const count = friends.length;

        if (count == 0) {
            return res
                .status(400)
                .json({ success: false, message: "No friends" });
        }

        res.status(200).json({
            success: true,
            message: "All Friends Retrieved",
            count: count,
            friends: friends,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Send Friend Request
// @route   POST /api/v1/users/travel-community/friends/send-friend-request/:id
// @access  Private
const sendFriendRequest = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const senderId = req.user._id;

        // Check if the friend ID is a valid MongoDB ObjectID
        if (!mongoose.isValidObjectId(senderId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid friend ID" });
        }

        if (senderId.toString() === id) {
            return res
                .status(400)
                .json({ message: "Cannot send a request to yourself." });
        }

        // Retrieve the current user from the database
        const recipient = await User.findById(id);
        const sender = await User.findById(senderId);

        if (!sender || !recipient) {
            return res
                .status(400)
                .json({ success: false, message: "Users not found" });
        }

        if (
            recipient.friendRequestsReceived.includes(senderId) ||
            recipient.friends.includes(senderId)
        ) {
            return res.status(400).json({
                message:
                    "Friend request already sent or user is already a friend.",
            });
        }

        recipient.friendRequestsReceived.push(senderId);
        sender.friendRequestsSent.push(id);

        await recipient.save();
        await sender.save();

        res.status(200).json({
            success: true,
            message: "Friend request sent successfully",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Accept Friend Request
// @route   POST /api/v1/users/travel-community/friends/accept-friend-request/:id
// @access  Private
const acceptFriendRequest = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Check if the friend ID is a valid MongoDB ObjectID
        if (!mongoose.isValidObjectId(senderId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid friend ID" });
        }

        const user = await User.findById(userId);
        const requester = await User.findById(id);

        if (!user || !requester) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.friendRequestsReceived.includes(id)) {
            return res
                .status(400)
                .json({ message: "Friend request not found." });
        }

        // Move users from friend requests to friends list
        user.friends.push(id);
        requester.friends.push(userId);

        user.friendRequestsReceived = user.friendRequestsReceived.filter(
            (id) => id.toString() !== id
        );
        requester.friendRequestsSent = requester.friendRequestsSent.filter(
            (id) => id.toString() !== userId
        );

        await user.save();
        await requester.save();

        res.status(200).json({
            success: true,
            message: "Friend request accepted",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Reject a Friend Request
// @route   DELETE /api/v1/users/reject-friend-request/:id
// @access  Private
const rejectFriendRequest = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request ID" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Check if the friend request exists in pendingRequests
        const requestIndex = user.pendingRequests.indexOf(id);
        if (requestIndex === -1) {
            return res
                .status(404)
                .json({ success: false, message: "Friend request not found" });
        }

        // Remove the friend request from pendingRequests
        user.pendingRequests.splice(requestIndex, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Friend request rejected",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export {
    getAFriend,
    getAllFriends,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
};

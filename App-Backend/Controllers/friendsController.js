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

export { getAFriend };

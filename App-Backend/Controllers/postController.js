import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../Models/userModel.js";
import Post from "../Models/postModel.js";
import { uploadMediaFiles } from "../Helper/uploadMedia.js";

// @desc    Get A post
// @route   POST /api/v1/travel-community/posts/get-a-post/:id
// @access  Private
const getAPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid post id" });
        }

        const post = await Post.findById(id);

        if (post) {
            //Sending the response
            res.status(200).json({
                success: true,
                message: "Post data retrieval success",
                data: post,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No posts found",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Get all Posts with Lazy Loading, Like & Comment Count
// @route   POST /api/v1/travel-community/posts/get-all-posts
// @access  Private

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Number of posts to load at a time
        const lastPostId = req.query.lastPostId; // The last post's ID received from the frontend

        let query = {};
        if (lastPostId) {
            query._id = { $lt: lastPostId }; // Fetch posts with an ID less than the last fetched post
        }

        // Fetch posts with user info + like count + comment count
        const Posts = await Post.find(query)
            .populate("user", "name email image")
            .sort({ _id: -1 })
            .limit(limit)
            .lean(); // Convert Mongoose documents to plain JSON objects

        // Add like and comment count
        const modifiedPosts = Posts.map((post) => ({
            ...post,
            likeCount: post.likes.length, // Count the number of likes
            commentCount: post.comments.length, // Count the number of comments
        }));

        return res.status(200).json({
            success: true,
            data: {
                count: modifiedPosts.length,
                hasMore: modifiedPosts.length > 0,
                posts: modifiedPosts,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Create Post
// @route   POST /api/v1/travel-community/posts/create-post
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, caption, location } = req.body;

        let { category } = req.body;

        const mediaFiles = req.files;

        //Getting the id from the protect route
        const id = req.user._id;

        if (!title || !caption || !category || !location) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, caption, location and at least one tag are required",
            });
        }

        //Find the user
        const user = await User.findById({ _id: id });

        if (user) {
            // Upload media files to Cloudinary
            let media = [];
            if (mediaFiles && mediaFiles.length > 0) {
                const mediaUrls = await uploadMediaFiles(mediaFiles);
                media = mediaUrls.map((url, index) => ({
                    url,
                    mediaType: mediaFiles[index].mimetype.startsWith("image")
                        ? "Image"
                        : "Video",
                }));
            }

            // Create the post
            const post = new Post({
                user: id,
                title,
                caption,
                location,
                category,
                media,
            });

            // Save the post
            await post.save();

            // Return success response
            return res.status(201).json({ success: true, post });
        } else {
            return res.status(400).json({
                success: false,
                message: "Not an user cannot create post",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Update The Posts
// @route   POST /api/v1/travel-community/posts/update-post/:id
// @access  Private

const updatePost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID",
            });
        }

        const { title, caption, location, deleteMedia } = req.body;
        let { tags } = req.body;

        // Fetch the post by ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Parse tags if provided as a string
        if (tags && typeof tags === "string") {
            tags = tags.split(",").map((tag) => tag.trim());
        }

        const mediaFiles = req.files;
        let updatedMedia = post.media;

        // Handle media deletion only in the database
        if (deleteMedia && deleteMedia.length > 0) {
            updatedMedia = updatedMedia.filter(
                (media) => !deleteMedia.includes(media.url)
            );
        }

        // Handle new media uploads
        if (mediaFiles && mediaFiles.length > 0) {
            const mediaUrls = await uploadMediaFiles(mediaFiles);
            const newMedia = mediaUrls.map((url, index) => ({
                url,
                mediaType: mediaFiles[index].mimetype.startsWith("image")
                    ? "Image"
                    : "Video",
            }));
            updatedMedia = [...updatedMedia, ...newMedia];
        }

        // Capitalize tags if they are provided
        const capitalizedTags = tags
            ? tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
            : post.tags;

        // Update post fields
        post.title = title || post.title;
        post.caption = caption || post.caption;
        post.location = location || post.location;
        post.tags = capitalizedTags;
        post.media = updatedMedia;

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Get related Posts based on location
// @route   POST /api/v1/travel-community/posts/get-related-posts
// @access  Private

const getRelatedPosts = asyncHandler(async (req, res) => {
    try {
        const { location, id } = req.query; // Get location and post ID from query

        if (!location || !id) {
            return res.status(400).json({
                success: false,
                message: "The location and id are required",
            });
        }

        // Finding the original post
        const originalPost = await Post.findById(id);
        if (!originalPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Find related posts by location (excluding the original post)
        const relatedPosts = await Post.find({
            _id: { $ne: id }, // Exclude the original post
            location: location, // Match the same location
        }).limit(5);

        if (relatedPosts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No related posts found",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                count: relatedPosts.length,
                posts: relatedPosts,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            err: err.message,
        });
    }
});

// @desc    Delete Post Data
// @route   POST /api/v1/travel-community/posts/delete-post/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid post id" });
        }

        const deletePost = await Post.findByIdAndDelete(id);

        if (!deletePost) {
            return res.status(404).json({
                success: false,
                message: "Post not found to delete",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deletion was successfully done",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export {
    createPost,
    getAllPosts,
    updatePost,
    getRelatedPosts,
    getAPost,
    deletePost,
};

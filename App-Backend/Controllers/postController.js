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

// @desc    Get all Posts
// @route   POST /api/v1/travel-community/posts/get-all-posts
// @access  Private

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        // Pagination Parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetching posts from the database, including user info
        const Posts = await Post.find()
            .populate("user", "name email image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();

        const totalPosts = await Post.countDocuments();

        // Check if there are any posts
        if (Posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts available",
            });
        }

        // Success message
        return res.status(200).json({
            success: true,
            data: {
                count: Posts.length,
                page,
                totalPages: Math.ceil(totalPosts / limit),
                posts: Posts,
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

        let { tags } = req.body;

        const mediaFiles = req.files;

        //Getting the id from the protect route
        const id = req.user._id;

        if (!title || !caption || !tags || !location || tags.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, caption, location and at least one tag are required",
            });
        }

        // Ensuring tags is an array
        if (typeof tags === "string") {
            tags = tags.split(",").map((tag) => tag.trim());
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

            // Capitalize tags
            const capitalizedTags = tags.map(
                (tag) => tag.charAt(0).toUpperCase() + tag.slice(1)
            );

            // Create the post
            const post = new Post({
                user: id,
                title,
                caption,
                location,
                tags: capitalizedTags,
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

// @desc    Get related Posts
// @route   POST /api/v1/travel-community/posts/get-related-posts
// @access  Private

const getRelatedPosts = asyncHandler(async (req, res) => {
    try {
        const { tags, id } = req.query; // Get tags and id from the query

        if (!tags || !id) {
            return res.status(400).json({
                success: false,
                message: "The tags and id are required",
            });
        }

        // Ensure tags is an array and capitalize each tag
        const capitalizedTags = tags
            .split(",")
            .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1));

        // Finding the original post
        const originalPost = await Post.findById(id);
        if (!originalPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Find related posts by tags (excluding the original post)
        const relatedPosts = await Post.find({
            _id: { $ne: id }, // Exclude the original post
            tags: { $in: capitalizedTags }, // Match any of the tags
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

import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import Post from "../Models/postModel.js";
import { uploadMediaFiles } from "../Helper/uploadMedia.js";

// @desc    Get all Posts
// @route   POST /api/v1/users/posts/get-all-posts
// @access  Private

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        //Pagination Parameters
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

        //Success message
        return res.status(200).json({
            success: true,
            data: {
                count: Posts.length,
                page,
                totalPosts: Math.ceil(totalPosts / limit),
                Posts,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Create Post
// @route   POST /api/v1/users/posts/create-post
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, caption } = req.body;

        let { tags } = req.body;

        const mediaFiles = req.files;

        //Getting the id from the protect route
        const id = req.user._id;

        if (!title || !caption || !tags || tags.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title, caption, and at least one tag are required",
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

// @desc    Get related Posts
// @route   POST /api/v1/users/posts/get-related-posts
// @access  Private

const getRelatedPosts = asyncHandler(async (req, res) => {
    try {
        const { tags, id } = req.params;

        if (!tags || !id) {
            return res.status(400).json({
                success: false,
                message: "The tags and id are required",
            });
        }

        // Capitalizing the type
        const postTag = type.charAt(0).toUpperCase() + type.slice(1);

        // Finding the original post
        const originalPost = await Post.findById(id);
        if (!originalPost) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        const relatedPosts = await Post.find({
            _id: { $ne: id },
            tags: postTag,
        }).limit(5);

        if (relatedPosts.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No related posts found" });
        }

        res.status(200).json({
            success: true,
            data: { count: relatedPosts.length, posts: relatedPosts },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { createPost, getAllPosts, getRelatedPosts };

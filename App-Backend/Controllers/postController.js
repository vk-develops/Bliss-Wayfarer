import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../Models/userModel.js";
import Post from "../Models/postModel.js";
import { uploadMediaFiles } from "../Helper/uploadMedia.js";
import { calculateRelevanceScore } from "../Helper/calculateRelevanceScore.js";
import { checkImageForSpam, checkTextForSpam } from "../Helper/checkSpamAi.js";

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

        let query = {
            $or: [{ flagged: false }, { flagged: { $exists: false } }], // Include posts where flagged is false OR not present
        };

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
        const { title, caption, location, category } = req.body;
        const mediaFiles = req.files;
        const userId = req.user._id;

        // Validate required fields
        if (!title || !caption || !category || !location) {
            return res.status(400).json({
                success: false,
                message: "Title, caption, location, and category are required.",
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found. Cannot create post.",
            });
        }

        // Upload media files to Cloudinary (if any)
        let media = [];
        if (mediaFiles?.length > 0) {
            const mediaUrls = await uploadMediaFiles(mediaFiles);
            media = mediaUrls.map((url, index) => ({
                url,
                mediaType: mediaFiles[index].mimetype.startsWith("image")
                    ? "Image"
                    : "Video",
            }));
        }

        // Check for spam/offensive content
        const firstMediaUrl = media[0]?.url || "";
        const [titleCheck, captionCheck, imageCheck] = await Promise.all([
            checkTextForSpam(title),
            checkTextForSpam(caption),
            firstMediaUrl
                ? checkImageForSpam(firstMediaUrl)
                : { flagged: false },
        ]);

        // Determine if flagged
        let flagged = false;
        let flaggedReason = "";

        if (titleCheck.flagged) {
            flagged = true;
            flaggedReason = `Title Issue: ${titleCheck.reason}`;
        } else if (captionCheck.flagged) {
            flagged = true;
            flaggedReason = `Caption Issue: ${captionCheck.reason}`;
        } else if (imageCheck.flagged) {
            flagged = true;
            flaggedReason = `Image Issue: ${imageCheck.reason}`;
        }

        // Create post
        const post = new Post({
            user: userId,
            title,
            caption,
            location,
            category,
            media,
            flagged,
            ...(flagged && { flaggedReason }), // Store reason only if flagged
        });

        // Save post to database
        await post.save();

        // Return appropriate response
        return res.status(201).json({
            success: true,
            message: flagged ? "Post flagged." : "Post created successfully.",
            post,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, error: err.message });
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

const gemSearch = asyncHandler(async (req, res) => {
    try {
        const { location, page = 1, limit = 10 } = req.query;

        let posts = await Post.find({
            location: { $regex: location, $options: "i" },
            $or: [{ flagged: false }, { flagged: { $exists: false } }],
        }).populate("user", "name email image");

        posts = posts.map((post) => ({
            ...post._doc,
            relevanceScore: calculateRelevanceScore(post),
        }));

        posts.sort((a, b) => b.relevanceScore - a.relevanceScore);

        // Apply pagination for lazy loading
        const startIndex = (page - 1) * limit;
        const paginatedPosts = posts.slice(
            startIndex,
            startIndex + parseInt(limit)
        );

        res.status(200).json({
            success: true,
            message: "Posts retrieved",
            resultCount: paginatedPosts.length,
            results: paginatedPosts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(posts.length / limit),
                hasMore: startIndex + parseInt(limit) < posts.length,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== req.user._id
            );
            await post.save();
            return res.status(200).json({
                suceess: true,
                message: "Post unliked",
                likes: post.likes.length,
            });
        }

        // Else, like the post
        post.likes.push(req.user._id);
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post liked",
            likes: post.likes.length,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const commentPost = asyncHandler(async (req, res) => {
    try {
        const { text } = req.body;

        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (!text || text.trim() === "")
            return res.status(400).json({ error: "Comment cannot be empty" });

        const newComment = {
            user: req.user.id,
            text,
            createdAt: new Date(),
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({
            message: "Comment added",
            comment: newComment,
            commentsCount: post.comments.length,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const peopleSearch = asyncHandler(async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res
                .status(400)
                .json({ success: false, message: "Search query is required" });
        }

        const regexQuery = new RegExp(query, "i"); // Case-insensitive search

        // Find matching people
        const people = await User.find({
            $or: [{ name: regexQuery }],
        });

        res.json({ success: true, results: people });
    } catch (error) {
        console.error("Error searching people:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

const searchPosts = asyncHandler(async (req, res) => {
    try {
        const { location, page = 1, limit = 10 } = req.query;

        if (!location) {
            return res
                .status(400)
                .json({ success: false, message: "Location is required" });
        }

        const regexLocation = new RegExp(location, "i"); // Case-insensitive search

        // Find matching posts (excluding flagged ones)
        const totalPosts = await Post.countDocuments({
            location: regexLocation,
            $or: [{ flagged: false }, { flagged: { $exists: false } }], // Exclude flagged posts
        });

        const posts = await Post.find({
            location: regexLocation,
            $or: [{ flagged: false }, { flagged: { $exists: false } }],
        })
            .populate("user", "name email image") // Populate user details
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            resultCount: posts.length,
            results: posts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPosts / limit),
                hasMore: (page - 1) * limit + posts.length < totalPosts,
            },
        });
    } catch (error) {
        console.error("Error searching posts:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export {
    createPost,
    getAllPosts,
    updatePost,
    getRelatedPosts,
    getAPost,
    deletePost,
    gemSearch,
    likePost,
    commentPost,
    peopleSearch,
    searchPosts,
};

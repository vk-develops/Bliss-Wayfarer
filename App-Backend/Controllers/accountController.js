import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import AccountVerification from "../Models/accountVerificationModel.js";
import {
    Mailgenerator,
    generateOTP,
    mailTransport,
} from "../Utils/accountVerifiactionUtil.js";

// @desc    Verify account by entering the OTP recieved
// @route   POST /api/v1/users/account/verify
// @access  Private
const verifyAccount = asyncHandler(async (req, res) => {
    try {
        const { otp } = req.body;
        const id = req.user._id;

        //Check for input
        if (!otp) {
            return res
                .status(400)
                .json({ success: false, message: "Enter a valid OTP!" });
        }

        //Check for a user
        const user = await User.findById(id);
        if (user) {
            //Check for is user alredy verified
            if (!user.isVerified) {
                //Check for user's account verification model
                const verificationRecord = await AccountVerification.findOne({
                    owner: id,
                });
                if (verificationRecord) {
                    //Check for OTP match
                    const isOTPMatch = await bcrypt.compare(
                        otp,
                        verificationRecord.otpToken
                    );
                    if (isOTPMatch) {
                        //Marking user as a verified user
                        user.isVerified = true;
                        await user.save();

                        //Sending the success message to user's mail
                        let response = {
                            body: {
                                name:
                                    user.name.charAt(0).toUpperCase() +
                                    user.name.slice(1),
                                intro: [
                                    `Congrats ${user.name}, your account has been verified and you may start using our app for free and get dived into the world of exploring weather insights with SkySavvy's accuracy.`,
                                ],
                                outro: "Looking forward to do more business",
                            },
                        };

                        let mail = Mailgenerator.generate(response);

                        //Creating the message needed to be sent
                        let message = {
                            from: process.env.GMAIL_EMAIL_ID,
                            to: user.email,
                            subject: "Account Verification Success",
                            html: mail,
                        };

                        // Sending the mail and handling the response
                        const sentMail = await mailTransport().sendMail(
                            message
                        );
                        console.log(
                            "Email sent successfully",
                            sentMail.response
                        );

                        //Deleting the verification record
                        await verificationRecord.deleteOne();

                        //Sending the response after all executions
                        res.status(200).json({
                            success: true,
                            message:
                                "OTP verified!, Account verification success",
                            userInfo: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                            },
                        });
                    } else {
                        return res.status(409).json({
                            success: false,
                            message: "OTP does not match!",
                        });
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Account verification record not found",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message:
                        "User is already verified, no need to verify again",
                });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const bookmarkPosts = asyncHandler(async (req, res) => {
    const { userId, postId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });

        const index = user.bookmarkedPosts.indexOf(postId);
        if (index === -1) {
            user.bookmarkedPosts.push(postId);
        } else {
            user.bookmarkedPosts.splice(index, 1);
        }

        await user.save();
        res.json({
            success: true,
            message: "Bookmark updated",
            data: user.bookmarkedPosts,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const bookmarkPlaces = asyncHandler(async (req, res) => {
    const { userId, placeId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });

        const index = user.bookmarkedPlaces.indexOf(placeId);
        if (index === -1) {
            user.bookmarkedPlaces.push(placeId);
        } else {
            user.bookmarkedPlaces.splice(index, 1);
        }

        await user.save();
        res.json({
            success: true,
            message: "Bookmark updated",
            data: user.bookmarkedPlaces,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const getBookmarkedPosts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("bookmarkedPosts");

        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, posts: user.bookmarkedPosts });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

const getBookmarkedPlaces = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });

        // Query Sanity for places based on bookmarked IDs
        const query = `*[_type == "place" && _id in $ids]`;
        const places = await sanityClient.fetch(query, {
            ids: user.bookmarkedPlaces,
        });

        res.status(200).json({ success: true, places });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

//Exports
export { verifyAccount, bookmarkPosts, bookmarkPlaces };

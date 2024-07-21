import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import generateToken from "../Utils/generateToken.js";
import { isValidEmail } from "../Validation/emailValidation.js";
import {
    Mailgenerator,
    generateOTP,
    mailTransport,
} from "../Utils/accountVerifiactionUtil.js";
import AccountVerification from "../Models/accountVerificationModel.js";

// @desc    Register users & and get a token
// @route   POST /api/v1/users/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check for all fields
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are neccessary" });
        }

        //Email Validation
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Registration failed. Invalid email format",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password length must be greater than 8",
            });
        }

        //Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Already a user" });
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Storing the user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            //Generating a token after registering
            generateToken(res, user._id);

            //Generating OTP
            const OTP = generateOTP();

            //Hashing the OTP
            const hashedOTP = await bcrypt.hash(OTP, 10);

            //Saving the OTP in the account verification mnodel
            const accVerify = new AccountVerification({
                owner: user._id,
                otpToken: hashedOTP,
            });

            //Saving the record
            await accVerify.save();

            //Sending the OTP to user's mail
            let response = {
                body: {
                    name:
                        user.name.charAt(0).toUpperCase() + user.name.slice(1),
                    intro: [
                        `Congrats for being a user of our app. Please verify your account.`,
                        `Your OTP: <strong style="color: #111111;">${OTP}</strong>`,
                    ],
                    outro: "Looking forward to do more business",
                },
            };

            let mail = Mailgenerator.generate(response);

            //Creating the message needed to be sent
            let message = {
                from: process.env.GMAIL_EMAIL_ID,
                to: user.email,
                subject: "Verify your email account",
                html: mail,
            };

            // Sending the mail and handling the response
            const sentMail = await mailTransport().sendMail(message);
            console.log("Email sent successfully", sentMail.response);

            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            //Sending Resopnse
            res.status(200).json({
                success: true,
                message:
                    "User registration sucesss, Account verification OTP send to your mail",
                data: resetofUserDetails,
                userInfo: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Login users with a token
// @route   POST /api/v1/users/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);
        console.log(req.body);

        //Check for all fields
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are necessary" });
        }

        //Check for user
        const user = await User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                //Check for password match
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isPasswordMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Passwords does not match",
                    });
                } else {
                    //Generating a token after logining in
                    generateToken(res, user._id);

                    //Destructuring the user details
                    const { password, ...resetofUserDetails } = user._doc;

                    //Sending Resopnse
                    res.status(200).json({
                        success: true,
                        message: "User Login sucesss",
                        data: resetofUserDetails,
                        userInfo: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                    });
                }
            } else {
                return res
                    .status(400)
                    .json({ success: false, message: "User is not verified" });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not exists" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Logout users and delete token
// @route   POST /api/v1/users/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    try {
        //Removing the cookie
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        //Response
        res.status(200).json({
            success: true,
            message: "Account logout success.",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    To check if user is loggedin and do they have the token
// @route   POST /api/v1/users/auth/isloggedin
// @access  Private
const isLoggedin = asyncHandler(async (req, res) => {
    try {
        //Getting the id from the protect route
        const id = req.user._id;

        //Find the user
        const user = await User.findById(id);

        if (user) {
            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            //Destructuring the user info
            const { _id, name, email } = user;

            res.status(200).json({
                success: true,
                message: "Yes, User is loggedin",
                data: resetofUserDetails,
                userInfo: { _id, name, email },
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { registerUser, loginUser, logoutUser, isLoggedin };

import mongoose from "mongoose";

const accountVerificationSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otpToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10,
    },
});

const AccountVerification = mongoose.model(
    "AccountVerification",
    accountVerificationSchema
);

//Export
export default AccountVerification;

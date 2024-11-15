import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/authRoute.js";
import accountRoute from "./Routes/accountRoute.js";
import adminTravelRoute from "./Routes/Admin/adminTravelRoute.js";
import postRoute from "./Routes/postRoute.js";
import adminPostRoute from "./Routes/Admin/adminPostRoute.js";
import friendsRoute from "./Routes/friendsRoute.js";

//App init
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

//Built-in Middlewares and Imported ones
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Cloudinary init
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET_KEY,
});

//HTTP GET Method Test
app.get("/api/v1/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

//API's
app.use("/api/v1/users/auth", authRoute);
app.use("/api/v1/users/account", accountRoute);
app.use("/api/v1/users/travel-community/posts", postRoute);
app.use("/api/v1/users/travel-community/friends", friendsRoute);

//Admin Api's
app.use("/api/v1/admin/travel-places/attractions", adminTravelRoute);
app.use("/api/v1/admin/travel-community/posts", adminPostRoute);

//App listen
app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});

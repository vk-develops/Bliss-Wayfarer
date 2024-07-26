import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser";

//App init
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

//Built-in Middlewares and Imported ones
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//HTTP GET Method Test
app.get("/api/v1/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

//App listen
app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});

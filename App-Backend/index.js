import express from "express";
import dotenv from "dotenv";

//App init
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Built-in Middlewares and Imported ones
app.use(express.json());

//Sample Api
app.get("/", (req, res) => {
    res.json({ success: true, message: "Http get method success" });
});

//App listen
app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});

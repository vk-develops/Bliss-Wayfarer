import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";

// router init
const router = express.Router();

router.post("/create-itinerary", protect);

export default router;

// Basic CRUD operations
// POST /api/itineraries
// GET /api/itineraries
// GET /api/itineraries/:id
// PUT /api/itineraries/:id
// DELETE /api/itineraries/:id

// Collaboration endpoints
// POST /api/itineraries/:id/comments
// POST /api/itineraries/:id/friends
// DELETE /api/itineraries/:id/friends/:friendId

// Place management
// POST /api/itineraries/:id/days/:dayNumber/places
// PUT /api/itineraries/:id/days/:dayNumber/places/:placeId
// DELETE /api/itineraries/:id/days/:dayNumber/places/:placeId

// Reference management
// POST /api/itineraries/:id/references/posts
// POST /api/itineraries/:id/references/places

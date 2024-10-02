import express from "express";

// router init
const router = express.Router();

// HTTP Methods for creating travel places
router.post("create-attraction");
router.post("create-restaurant");
router.post("create-hotel");
router.post("create-travel-place");

// HTTP Methods for updating travel places
router.post("update-attraction/:id");
router.post("update-restaurant/:id");
router.post("update-hotel/:id");
router.post("update-travel-place/:id");

// HTTP Methods for deleting travel places
router.post("delete-attraction/:id");
router.post("delete-restaurant/:id");
router.post("delete-hotel/:id");
router.post("delete-travel-place/:id");

//Export
export default router;

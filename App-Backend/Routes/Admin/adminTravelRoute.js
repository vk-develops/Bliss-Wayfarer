import express from "express";
import multer from "multer";

// router init
const router = express.Router();

//Multer configurations
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

// HTTP Methods for getting/viewing travel places
router.get("get-all-attraction");
router.get("get-attraction/:id");
router.get("get-all-restaurant");
router.get("get-restaurant/:id");
router.get("get-all-hotel");
router.get("get-hotel/:id");
router.get("get-all-travel-place");

// HTTP Methods for creating travel places
router.post("create-attraction");
router.post("create-restaurant");
router.post("create-hotel");
router.post("create-travel-place");

// HTTP Methods for updating travel places
router.put("update-attraction/:id");
router.put("update-restaurant/:id");
router.put("update-hotel/:id");
router.put("update-travel-place/:id");

// HTTP Methods for deleting travel places
router.delete("delete-attraction/:id");
router.delete("delete-restaurant/:id");
router.delete("delete-hotel/:id");
router.delete("delete-travel-place/:id");

//Export
export default router;

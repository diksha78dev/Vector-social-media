import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { updateProfile, uploadAvatar } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
router.put("/update-profile", authMiddleware, updateProfile);

export default router;
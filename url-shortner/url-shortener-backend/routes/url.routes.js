import express from "express";
import { createShortUrl, deleteUrl } from "../controller/url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserUrls } from "../controller/url.controller.js";

const router = express.Router();

router.get("/user-urls", authMiddleware, getUserUrls);

// router.post("/shorten", createShortUrl);

router.post("/shorten", authMiddleware, createShortUrl);

router.delete("/delete/:id", authMiddleware, deleteUrl);

export default router;

import express from "express";
import { redirectToOriginalUrl } from "../controller/url.controller.js";

const router = express.Router();

router.get("/:shortId", redirectToOriginalUrl);

export default router;

import { nanoid } from "nanoid";
import validator from "validator";
import Url from "../models/url.js";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!validator.isURL(originalUrl)) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.status(200).json({
        message: "Short URL already exists",
        shortUrl: `http://localhost:5000/${existingUrl.shortId}`,
      });
    }

    const shortId = nanoid(6);
    const userId = req.user ? req.user.id : null;

    const newUrl = await Url.create({
      originalUrl,
      shortId,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      shortUrl: `http://localhost:5000/${shortId}`,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error("Error in redirection", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.user.id });

    return res.status(200).json({ count: urls.length, urls });
  } catch (error) {
    console.error("error fetching user URLs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    await Url.findByIdAndDelete(id);

    return res.status(200).json({ message: "URL deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

import express from "express";
import {
  deleteHandler,
  downloadHandler,
  listHandler,
  uploadHandler
} from "../controllers/storage.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../middlewares/storage.middleware.js";

const router = express.Router();

// Upload file(s)
router.post("/", protect, uploadMiddleware, uploadHandler);

// Download file (trả về public URL)
router.get("/:fileName", protect, downloadHandler);

// Delete file
router.delete("/:fileName", protect, deleteHandler);

// List all files
router.get("/", protect, listHandler);

export default router;

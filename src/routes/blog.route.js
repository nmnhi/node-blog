import express from "express";
import {
  create,
  getBlog,
  getBlogs,
  remove,
  update
} from "../controllers/blog.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Define blog routes here, e.g.:
router.post("/", protect, create);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

export default router;

import express from "express";
import { getFeedPosts, getUserPosts, likePost, postComment } from "../controllers/post.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
// Update
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, postComment);

export default router;
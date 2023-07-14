import express from "express";
import { getUser, getUserFriends, addRemoveFriend, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/updateUser", verifyToken, updateUser);

export default router;
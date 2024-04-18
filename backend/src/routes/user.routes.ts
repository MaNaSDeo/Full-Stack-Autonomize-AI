import express from "express";
import {
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/save-user/:username", saveUser); // GitHub User Data Storage

router.get("/find-mutual-followers/:username", findMutualFollowers); // Mutual Followers as Friends

router.get("/search-users", searchUsers); // Search Functionality

router.delete("/delete-user/:username", deleteUser); // Soft Delete User Records

router.patch("/update-user/:username", updateUser); // Update User Details

router.get("/list-users", listUsers); // List Users with Sorting

export default router;

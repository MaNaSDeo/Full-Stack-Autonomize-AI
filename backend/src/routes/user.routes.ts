import express from "express";
import {
  testController,
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

router.delete("/test/:username", testController); // Test Controller

router.get("/save-user/:username", saveUser); // GitHub User Data Storage

router.get("/find-mutual-followers/:username", findMutualFollowers); // Mutual Followers as Friends

router.get("/search-users", searchUsers); // Search Functionality

router.delete("/delete-user/:username", deleteUser); // Soft Delete User Records

export default router;

import express from "express";
import {
  testController,
  saveUser,
  findMutualFollowers,
  searchUsers,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/test", testController); // Test Controller

router.get("/save-user/:username", saveUser); // GitHub User Data Storage

router.get("/find-mutual-followers/:username", findMutualFollowers); // Mutual Followers as Friends

router.get("/search-users", searchUsers); // Search Functionality

export default router;

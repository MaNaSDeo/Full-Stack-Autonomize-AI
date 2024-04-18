import express from "express";
import {
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
} from "../controllers/user.controller";
import {
  validateUsernameParam,
  validateUpdateUser,
  validateListUsers,
} from "../middleware/validators";

const router = express.Router();

router.get("/save-user/:username", validateUsernameParam, saveUser); // GitHub User Data Storage

router.get(
  "/find-mutual-followers/:username",
  validateUsernameParam,
  findMutualFollowers
); // Mutual Followers as Friends

router.get("/search-users", searchUsers); // Search Functionality

router.delete("/delete-user/:username", validateUsernameParam, deleteUser); // Soft Delete User Records

router.patch("/update-user/:username", validateUpdateUser, updateUser); // Update User Details

router.get("/list-users", validateListUsers, listUsers); // List Users with Sorting

export default router;

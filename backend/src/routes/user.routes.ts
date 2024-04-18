import express from "express";
import {
  testController,
  saveUser,
  findMutualFollowers,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/test/:username", testController); // Test Controller

router.get("/save-user/:username", saveUser); // GitHub User Data Storage

router.get("/find-mutual-followers/:username", findMutualFollowers); // Mutual Followers as Friends

export default router;

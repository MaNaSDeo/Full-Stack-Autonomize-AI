import express from "express";
import { testController, saveUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/test/:username", testController); // Test Controller

router.get("/save-user/:username", saveUser); // GitHub User Data Storage

export default router;

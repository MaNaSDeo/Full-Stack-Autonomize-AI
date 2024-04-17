import express from "express";
import { testController } from "../controllers/user.controller";

const router = express.Router();

// Test Controller
router.get("/test", testController);

export default router;

import express from "express";
import { createQuiz } from "../controllers/quizController.js";
import { protect } from "../middlewares/jwt.js";
const router = express.Router();

// create a quiz
router.post("/", protect, createQuiz);

export default router;

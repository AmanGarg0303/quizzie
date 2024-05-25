import express from "express";
import {
  IncreaseImpressionOnQuiz,
  createQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middlewares/jwt.js";
const router = express.Router();

// create a quiz
router.post("/", protect, createQuiz);

// delete a quiz
router.delete("/:quizId", protect, deleteQuiz);

// increase impression on quiz
router.put("/:quizId", IncreaseImpressionOnQuiz);

export default router;

import express from "express";
import {
  IncreaseImpressionOnQuiz,
  TrendingQuizzes,
  createQuiz,
  deleteQuiz,
  playQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middlewares/jwt.js";
const router = express.Router();

// create a quiz
router.post("/", protect, createQuiz);

// delete a quiz
router.delete("/:quizId", protect, deleteQuiz);

// increase impression on quiz
router.put("/:quizId", IncreaseImpressionOnQuiz);

// // increase impression on quiz
// router.put("/:quizId", IncreaseImpressionOnQuiz);

// increase impression on quiz
router.get("/trending", protect, TrendingQuizzes);

// increase impression on quiz
router.patch("/playQuiz", playQuiz);

export default router;

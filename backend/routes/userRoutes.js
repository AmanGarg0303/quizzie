import express from "express";
const router = express.Router();
import { protect } from "../middlewares/jwt.js";
import {
  getAllMyQuizzes,
  getAllQuestionsOfAQuiz,
  getDashboardInfo,
  getSingleQuestion,
} from "../controllers/userControllers.js";

router.get("/analytics", protect, getAllMyQuizzes);

// get a single quiz
router.get("/analytics/:questionId", protect, getSingleQuestion);

// get all question from a single quiz (for question wise analysis)
router.get("/analytics/questionWise/:quizId", protect, getAllQuestionsOfAQuiz);

// get user dashboard info
router.get("/dashboard", protect, getDashboardInfo);

export default router;

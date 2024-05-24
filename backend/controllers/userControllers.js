import Quiz from "../modals/quiz.js";
import User from "../modals/user.js";
import Question from "../modals/question.js";
import createError from "../utils/createError.js";

// get all my quizzes to show in analytics
export const getAllMyQuizzes = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const quizzes = await Quiz.find({ userId: user._id });

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

// get a single question
export const getSingleQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const ques = await Question.findById(questionId);
    if (!ques) {
      return next(createError(404, "Question not found"));
    }

    res.status(200).json(ques);
  } catch (error) {
    next(error);
  }
};

// get all question of a quiz for question wise analysis
export const getAllQuestionsOfAQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(createError(404, "Quiz not found!"));
    }

    const questions = Promise.all(
      quiz?.questions.map(async (questionId) => {
        const ques = await Question.findById(questionId);
        return ques;
      })
    );

    const allQuestions = await questions;
    res.status(200).json(allQuestions);
  } catch (error) {
    next(error);
  }
};

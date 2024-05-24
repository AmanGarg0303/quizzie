import Quiz from "../modals/quiz.js";
import Question from "../modals/question.js";
import User from "../modals/user.js";
import createError from "../utils/createError.js";

export const createQuiz = async (req, res, next) => {
  try {
    const { quizName, quizType, timer, optionType, questions } = req.body;

    const user = req.user;
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const qu = Promise.all(
      questions.map(async (q) => {
        // console.log("Single question: " + q.question);

        const ques = await Question.create({
          question: q.question,
          quizType: q.quizType,
          optionType: q.optionType,
          correctAnswer: q.correctAnswer,
          options: q.options,
          timer: q.timer,
        });

        return ques._id;
      })
    ).then(async (res) => {
      console.log(res);

      const newQuiz = await Quiz.create({
        userId: user._id,
        quizName: quizName,
        quizType: quizType,
        timer: timer,
        optionType: optionType,
        questions: res,
      });

      //   console.log("New quiz: ", newQuiz);
      return newQuiz;
    });

    const finalQuiz = await qu;
    // console.log("final Quiz" + finalQuiz);

    await user.updateOne({ $push: { quizzes: finalQuiz._id } });

    res
      .status(201)
      .json({ message: "Quiz created successfully!", quizId: finalQuiz._id });
  } catch (error) {}
};

// delete a quiz with its questions
export const deleteQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return next(createError(404, "User not found!"));

    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return next(createError(404, "Quiz not found!"));

    Promise.all(
      quiz?.questions?.map(async (q) => {
        console.log(q);

        await Question.findByIdAndDelete(q);
      })
    ).then(async (res) => {
      await Quiz.findByIdAndDelete(quizId);
    });

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

/*

{
  "quizName":"General Quiz",
  "quizType":"QA",
  "timer":0,
  "optionType":"text",
  "answerOption":1,
  "questions":[
    {
    "question":"How are you?",
    "quizType":"QA",
    "optionType":"text",
    "timer":0,
    "correctAnswer":2,
    "options":[
      {"text":"Good"},
      {"text":"Fine"},
      {"text":"Absolutely Great"}
    ]
  },
  {
    "question":"How you doing is a dialogue from which TV show?",
    "quizType":"QA",
    "optionType":"text",
    "timer":0,
    "correctAnswer":4,
    "options":[
      {"text":"HIMYM"},
      {"text":"BBT"},
      {"text":"Young Sheldon"},
      {"text":"Friends"}
    ]
  }
  ]
}

// Quiz with image

{
    "quizName": "General Quiz 2",
    "quizType": "QA",
    "timer": 10,
    "optionType": "textImage",
    "questions": [
        {
            "question": "Which of these is a sports car?",
            "quizType": "QA",
            "optionType": "textImage",
            "timer": 10,
            "correctAnswer": 1,
            "options": [
                {
                    "text": "Ferrari",
                    "imageUrl":"https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/ferrari-car.jpg"
                },
                {
                    "text": "Maruti 800",
                    "imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Maruti_800_AC.jpg/280px-Maruti_800_AC.jpg"
                },
                {
                    "text": "Hyundai Venue",
                    "imageUrl":"https://www.team-bhp.com/sites/default/files/styles/check_high_res/public/2022-hyundai-venue-n-line-04.jpg"
                },
                {
                    "text": "Toyota Yaris",
                    "imageUrl":"https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20180410111057_yaris%20white.jpg&w=700&c=1"
                }
            ]
        },
        {
            "question": "Which show has a character named as Sheldon?",
            "quizType": "QA",
            "optionType": "textImage",
            "timer": 10,
            "correctAnswer": 3,
            "options": [
                {
                    "text": "Friends",
                    "imageUrl":"https://m.media-amazon.com/images/S/pv-target-images/e56c18e08e0a07c8d4ee65f45be64cefe6b070992a84182dd5ba35eb7cfc6510.jpg"
                },
                {
                    "text": "HIMYM",
                    "imageUrl":"https://ew.com/thmb/RVcztsLc2wv63ABv7igxr3Z7RQs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/himym-season-01-a6f88705b0504cafaffc8d0e2fa3b723.jpg"
                },
                {
                    "text": "Big Bang Theory",
                    "imageUrl":"https://images.tbs.com/tbs/$dyna_params/https%3A%2F%2Fi.cdn.tbs.com%2Fassets%2Fimages%2F2017%2F03%2FBigBangTheory-1920x1080.jpg"
                },
                {
                    "text": "Breaking Bad",
                    "imageUrl":"https://static0.srcdn.com/wordpress/wp-content/uploads/2023/03/the_cast_of_breaking_bad.jpg"
                }
            ]
        }
    ]
}


*/

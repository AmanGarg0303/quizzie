import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import styles from "./playQuiz.module.css";
import CongratulationsImg from "../../assets/congratulations.png";

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState("");

  // this fetches quiz data
  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(`user/analytics/q/${quizId}`);
        setQuizData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchD();
  }, [quizId]);

  // this will update impressions data of a quiz
  useEffect(() => {
    const fetchD = async () => {
      try {
        await newRequest.put(`quiz/${quizId}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchD();
  }, [quizId]);

  // this fetches quiz questions
  const [quizQuestions, setQuizQuestions] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(
          `user/analytics/questionWise/${quizId}`
        );
        setQuizQuestions(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, [quizId]);

  const [showComp, setShowComp] = useState(0);

  // console.log(quizData);
  // console.log(quizQuestions);

  return (
    <div className={styles.container}>
      <div className={styles.miniContainer}>
        {showComp === 0 && (
          <>
            <h1 className={styles.quizTitle}>{quizData?.quizName}</h1>
            <button
              onClick={() => setShowComp(1)}
              className={styles.startQuizBtn}
            >
              Start Quiz
            </button>
          </>
        )}

        {showComp === 1 && (
          <StartQuiz
            setShowComp={setShowComp}
            quizData={quizData}
            quizQuestions={quizQuestions}
          />
        )}

        {showComp === 2 && (
          <QuizCompleted
            setShowComp={setShowComp}
            quizData={quizData}
            quizQuestions={quizQuestions}
          />
        )}
      </div>
    </div>
  );
};

const StartQuiz = ({ setShowComp, quizData, quizQuestions }) => {
  const totalQuestionInQuiz = quizQuestions?.length - 1;
  const [currQuestion, setCurrQuestion] = useState(0);
  const [time, setTime] = useState(quizData?.timer);

  const handleNextQuestion = () => {
    if (currQuestion === totalQuestionInQuiz) {
      // TODO: submit the quiz and make changes in backend
      // setShowComp(2);
      return;
    }
    setCurrQuestion(currQuestion + 1);
    setTime(quizData?.timer);
  };
  console.log(currQuestion, totalQuestionInQuiz);
  // timer management
  useEffect(() => {
    const timerId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, currQuestion]);

  // console.log(time);

  // going to next question automatically, when time ends
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currQuestion === totalQuestionInQuiz) {
        // TODO: submit the quiz and make changes in backend
        // setShowComp(2);
        return;
      }
      if (quizData?.timer > 0) {
        setCurrQuestion(currQuestion + 1);
      }
      setTime(quizData?.timer);
    }, quizData?.timer * 1000);

    return () => clearInterval(timerId);
  }, [currQuestion, quizData?.timer]);

  return (
    <div className={styles.startQuizArea}>
      <div className={styles.topArea}>
        <p style={{ fontSize: "1.4rem", fontWeight: 700 }}>
          0{currQuestion + 1}/0{totalQuestionInQuiz + 1}
        </p>
        {quizData?.timer > 0 && (
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "red" }}>
            00:{time?.toString()?.padStart(2, "0")}s
          </p>
        )}
      </div>

      <h3 className={styles.questionText}>
        {quizQuestions[currQuestion]?.question}
      </h3>

      <div className={styles.options}>
        {quizQuestions[currQuestion]?.options?.map((o, idx) => (
          <div className={styles.optionBox} key={idx}>
            {quizData?.optionType === "text" && (
              <div style={{ padding: "1rem 4rem" }}>{o.text}</div>
            )}

            {quizData?.optionType === "image" && (
              <img
                src={o?.text}
                style={{
                  height: "8rem",
                  objectFit: "fill",
                  borderRadius: "8px",
                  width: "100%",
                }}
                alt=""
              />
            )}

            {quizData?.optionType === "textImage" && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  padding: "0 0.5rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "1.6rem" }}>{o.text}</p>
                <img
                  src={o.imageUrl}
                  alt=""
                  style={{
                    width: "9rem",
                    borderRadius: "8px",
                    height: "7rem",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.nextBtnDiv}>
        <button className={styles.nextBtn} onClick={handleNextQuestion}>
          {currQuestion === totalQuestionInQuiz ? "SUBMIT" : "NEXT"}
        </button>
      </div>
    </div>
  );
};

const QuizCompleted = ({ quizData }) => {
  return (
    <div className={styles.quizComplete}>
      {quizData.quizType === "QA" ? (
        <div>
          <h2
            style={{
              fontSize: "2rem",
            }}
          >
            Congrats Quiz is completed
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={CongratulationsImg} alt="congratulationsImg" />
          </div>

          <p
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Your Score is <span style={{ color: "green" }}>03/04</span>
          </p>
        </div>
      ) : (
        <p
          style={{
            fontSize: "3.5rem",
            textAlign: "center",
            fontWeight: 600,
            color: "#222222",
          }}
        >
          Thank you <br /> for participating in <br /> the Poll
        </p>
      )}
    </div>
  );
};

export default PlayQuiz;
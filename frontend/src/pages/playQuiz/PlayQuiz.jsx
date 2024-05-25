import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import styles from "./playQuiz.module.css";
import CongratulationsImg from "../../assets/congratulations.png";

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState("");

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
  return (
    <div className={styles.startQuizArea}>
      <div className={styles.topArea}>
        <p style={{ fontSize: "1.4rem", fontWeight: 700 }}>01/04</p>
        <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "red" }}>
          00:{quizQuestions[0].timer}s
        </p>
      </div>

      <h3 className={styles.questionText}>{quizQuestions[1].question}</h3>

      <div className={styles.options}>
        {quizQuestions[1].options?.map((o, idx) => (
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
        <button className={styles.nextBtn}>NEXT</button>
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

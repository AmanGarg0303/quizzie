import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import styles from "./playQuiz.module.css";

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

  return (
    <div className={styles.container}>
      <div className={styles.miniContainer}>
        <h1 className={styles.quizTitle}>{quizData?.quizName}</h1>
        <button className={styles.startQuizBtn}>Start Quiz</button>
      </div>
    </div>
  );
};

export default PlayQuiz;

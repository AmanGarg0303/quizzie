import React from "react";
import styles from "./dashboard.module.css";
import { QuizzesComp } from "../../components/quizzesComp/QuizzesComp";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        <div className={styles.singleContent} style={{ color: "orange" }}>
          <p className={styles.heading}>
            <span>12 </span> Quiz
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "green" }}>
          <p className={styles.heading}>
            <span>110 </span>questions
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "blue" }}>
          <p className={styles.heading}>
            <span>1.4K </span> total
          </p>
          <p className={styles.para}>impressions</p>
        </div>
      </div>

      <h6 style={{ margin: "4rem 0 3rem 0", fontSize: "2rem" }}>
        Trending Quizzes
      </h6>

      <div className={styles.quizzesComp}>
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
        <QuizzesComp />
      </div>
    </div>
  );
};

export default Dashboard;

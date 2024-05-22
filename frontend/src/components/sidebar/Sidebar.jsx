import React from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>QUIZZIE</h1>

      <div className={styles.content}>
        <Link to={`/dashboard`} className={styles.link}>
          <h5
            className={`${styles.contentTitle} ${
              pathname === "/dashboard" && styles.selected
            }`}
          >
            Dashboard
          </h5>
        </Link>

        <Link to={`/dashboard/analytics`} className={styles.link}>
          <h5
            className={`${styles.contentTitle} ${
              pathname === "/dashboard/analytics" && styles.selected
            }`}
          >
            Analytics
          </h5>
        </Link>

        <h5 className={styles.contentTitle}>Create Quiz</h5>
      </div>

      <button className={styles.logout}>LOGOUT</button>
    </div>
  );
};

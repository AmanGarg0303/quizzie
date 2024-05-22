import React, { useState } from "react";
import styles from "./home.module.css";
import { Register } from "../../components/register/Register";
import { Login } from "../../components/login/Login";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(0); // 0=signup, 1=login

  return (
    <div className={styles.container}>
      <div className={styles.auth_container}>
        <h1>QUIZZIE</h1>

        <div className={styles.activeComp}>
          <button
            onClick={() => setActiveComponent(0)}
            className={`${styles.register} ${
              activeComponent === 0 && styles.activeState
            }`}
          >
            Signup
          </button>
          <button
            onClick={() => setActiveComponent(1)}
            className={`${styles.login} ${
              activeComponent === 1 && styles.activeState
            }`}
          >
            Login
          </button>
        </div>

        <div className={styles.m}>
          {activeComponent === 0 ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Home;

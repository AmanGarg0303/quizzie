import React from "react";
import styles from "./login.module.css";

export const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.form_input}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            autoComplete="off"
            className={styles.inputField}
          />
        </div>

        <div className={styles.form_input}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            className={styles.inputField}
          />
        </div>

        <div className={styles.loginBtnDiv}>
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

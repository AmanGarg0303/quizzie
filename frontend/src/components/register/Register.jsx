import React from "react";
import styles from "./register.module.css";

export const Register = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.form_input}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            name="username"
            autoComplete="off"
            className={styles.inputField}
          />
        </div>

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

        <div className={styles.form_input}>
          <label htmlFor="confirm_password" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="text"
            id="confirm_password"
            placeholder="Confirm Password"
            name="confirm_password"
            autoComplete="off"
            className={styles.inputField}
          />
        </div>

        <div className={styles.registerBtnDiv}>
          <button type="submit" className={styles.btn}>
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  );
};

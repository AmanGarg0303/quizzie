import React from "react";
import styles from "./analytics.module.css";

const EditSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="purple"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-file-pen-line"
  >
    <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
    <path d="M8 18h1" />
    <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
  </svg>
);

const deleteSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-trash-2"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const shareSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="green"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-share-2"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

const Analytics = () => {
  return (
    <div className={styles.analytics}>
      <h2 className={styles.heading}>Quiz Analysis</h2>

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr style={{ borderRadius: "80px" }}>
              <th className={styles.headTH}>S.No</th>
              <th className={styles.headTH}>Quiz Name</th>
              <th className={styles.headTH}>Created On</th>
              <th className={styles.headTH}>Impression</th>
              <th className={styles.headTH}></th>
              <th className={styles.headTH}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Quiz 1</td>
              <td>14 Sep, 2024</td>
              <td>456</td>
              <td className={styles.actions}>
                <span className={styles.icon}>{EditSVG}</span>
                <span className={styles.icon}>{deleteSVG}</span>
                <span className={styles.icon}>{shareSVG}</span>
              </td>
              <td>
                <span className={styles.questionWise}>
                  Question Wise Analysis
                </span>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Quiz 2</td>
              <td>14 Sep, 2024</td>
              <td>456</td>
              <td className={styles.actions}>
                <span className={styles.icon}>{EditSVG}</span>
                <span className={styles.icon}>{deleteSVG}</span>
                <span className={styles.icon}>{shareSVG}</span>
              </td>
              <td>
                <span className={styles.questionWise}>
                  Question Wise Analysis
                </span>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Quiz 3</td>
              <td>14 Sep, 2024</td>
              <td>456</td>
              <td className={styles.actions}>
                <span className={styles.icon}>{EditSVG}</span>
                <span className={styles.icon}>{deleteSVG}</span>
                <span className={styles.icon}>{shareSVG}</span>
              </td>
              <td>
                <span className={styles.questionWise}>
                  Question Wise Analysis
                </span>
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>Quiz 4</td>
              <td>14 Sep, 2024</td>
              <td>456</td>
              <td className={styles.actions}>
                <span className={styles.icon}>{EditSVG}</span>
                <span className={styles.icon}>{deleteSVG}</span>
                <span className={styles.icon}>{shareSVG}</span>
              </td>
              <td>
                <span className={styles.questionWise}>
                  Question Wise Analysis
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;

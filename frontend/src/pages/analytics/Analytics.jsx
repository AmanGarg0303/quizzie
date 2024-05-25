import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import newRequest from "../../utils/newRequest";
import formatDate from "../../utils/formatDate";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteQuizModal } from "../../components/deleteQuizModal/DeleteQuizModal";

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
  const [analyticsData, setAnalyticsData] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(`user/analytics`);
        setAnalyticsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      fetchD();
    }
  }, []);

  const handleShareQuiz = (quizId) => {
    navigator.clipboard.writeText(`http://localhost:3000/playquiz/${quizId}`);

    toast.success("Link copied to clipboard");
  };

  const [openDeleteQuizModal, setOpenDeleteQuizModal] = useState(false);
  const [quId, setQuId] = useState("");

  const handleDeleteQuiz = async (quizId) => {
    try {
      console.log({ quizId });
      // const res = await newRequest.delete(`quiz/${quizId}`);
      // toast.success(res?.data?.message);
      setOpenDeleteQuizModal(false);
    } catch (error) {
      console.log(error);
    }
  };

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
            {analyticsData?.map((analytic, i) => (
              <tr key={analytic._id}>
                <td>{i + 1}</td>
                <td>{analytic?.quizName}</td>
                <td>{formatDate(analytic.createdAt)}</td>
                <td>{analytic.impressions}</td>
                <td className={styles.actions}>
                  <span title="edit" className={styles.icon}>
                    {EditSVG}
                  </span>
                  <span
                    title="delete"
                    className={styles.icon}
                    onClick={() => {
                      setOpenDeleteQuizModal(true);
                      setQuId(analytic._id);
                    }}
                  >
                    {deleteSVG}
                  </span>

                  <DeleteQuizModal
                    openDeleteQuizModal={openDeleteQuizModal}
                    setOpenDeleteQuizModal={setOpenDeleteQuizModal}
                    quId={quId}
                  />

                  <span
                    className={styles.icon}
                    title="share"
                    onClick={() => handleShareQuiz(analytic._id)}
                  >
                    {shareSVG}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/dashboard/analytics/questionWise/${analytic._id}`}
                    className={styles.link}
                  >
                    <span className={styles.questionWise}>
                      Question Wise Analysis
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {analyticsData.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            No data to show!
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

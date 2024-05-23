import React, { useState } from "react";
import styles from "./QA.module.css";
import { Modal } from "@mantine/core";

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

const Slide = ({
  slideCount,
  activeSlideIdx,
  handleSlideClick,
  handleAddSlide,
  handleDeleteSlide,
}) => (
  <div className={styles.slideContainer}>
    <p className={styles.heading}>Max 5 questions</p>
    <div className={styles.allSlides}>
      {[...Array(slideCount)].map((_, index) => (
        <div
          key={index}
          onClick={() => handleSlideClick(index + 1)}
          style={{
            border:
              index + 1 === activeSlideIdx
                ? "2px solid #73ABFF"
                : "2px solid transparent",
          }}
          className={styles.slideNumber}
        >
          {index + 1}
          {activeSlideIdx === index + 1 && (
            <span
              className={styles.modalCloseIcon}
              onClick={async () => {
                if (index + 1 === slideCount) {
                  await handleSlideClick(index + 1);
                  handleDeleteSlide(index + 1);
                } else {
                  handleDeleteSlide(index + 1);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          )}
        </div>
      ))}
      {slideCount < 5 && (
        <div
          onClick={() => {
            handleAddSlide();
          }}
          className={styles.addSlide}
        >
          +
        </div>
      )}
    </div>
  </div>
);

const Form = ({
  postData,
  activeSlideIdx,
  handleQuestionChange,
  handleOptionTypeChange,
  handleAnswerChange,
  handleSetOptionType,
  handleAddOption,
  optionType,
  handleChangeOptionContentText,
  handleChangeOptionContentImageUrl,
  handleDeleteOption,
  handleTimeChange,
}) => {
  if (activeSlideIdx > postData?.slides?.length) {
    return null;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputQuestion}>
        <input
          type="text"
          placeholder="Quiz question"
          className={styles.question}
          onChange={(e) => {
            handleQuestionChange(activeSlideIdx, e.target.value);
          }}
          value={postData.slides[activeSlideIdx - 1].question}
        />
      </div>

      <div className={styles.optionType}>
        <span>Option Type</span>

        <div className={styles.optionTypeContent}>
          <input
            type="radio"
            name="optionType"
            id="text"
            style={{ width: "1rem" }}
            onChange={(e) => {
              handleSetOptionType("text");
              handleOptionTypeChange(activeSlideIdx, "text");
            }}
            checked={postData.slides[activeSlideIdx - 1].optionType === "text"}
          />
          <label htmlFor="text">Text</label>
        </div>

        <div className={styles.optionTypeContent}>
          <input
            style={{ width: "1rem" }}
            type="radio"
            name="optionType"
            id="image"
            onChange={(e) => {
              handleSetOptionType("image");
              handleOptionTypeChange(activeSlideIdx, "image");
            }}
            checked={postData.slides[activeSlideIdx - 1].optionType === "image"}
          />
          <label htmlFor="image">Image</label>
        </div>
        <div style={{ width: "1rem" }} className={styles.optionTypeContent}>
          <input
            type="radio"
            name="optionType"
            id="textImage"
            onChange={(e) => {
              handleSetOptionType("textImage");
              handleOptionTypeChange(activeSlideIdx, "textImage");
            }}
            checked={
              postData.slides[activeSlideIdx - 1].optionType === "textImage"
            }
          />
          <label htmlFor="textImage" style={{ whiteSpace: "nowrap" }}>
            Text & Image
          </label>
        </div>
      </div>

      <div className={styles.answersContent}>
        {postData.slides[activeSlideIdx - 1].options.map((option, i) => (
          <div className={styles.answers} key={i}>
            <input
              style={{ width: "1rem" }}
              type="radio"
              name="answer"
              id={i}
              onChange={(e) => {
                handleAnswerChange(activeSlideIdx, i + 1);
              }}
              checked={
                postData.slides[activeSlideIdx - 1].answerOption === i + 1
              }
            />
            <input
              style={{
                backgroundColor:
                  postData.slides[activeSlideIdx - 1].answerOption === i + 1 &&
                  "green",
                color:
                  postData.slides[activeSlideIdx - 1].answerOption === i + 1 &&
                  "white",
              }}
              type="text"
              placeholder={optionType === "image" ? "imageUrl" : "text"}
              className={styles.answerInput}
              onChange={(e) =>
                handleChangeOptionContentText(activeSlideIdx, i, e.target.value)
              }
              value={postData.slides[activeSlideIdx - 1].options[i].text}
            />
            {optionType === "textImage" && (
              <input
                style={{
                  backgroundColor:
                    postData.slides[activeSlideIdx - 1].answerOption ===
                      i + 1 && "green",
                  color:
                    postData.slides[activeSlideIdx - 1].answerOption ===
                      i + 1 && "white",
                }}
                type="text"
                placeholder="imageUrl"
                className={styles.answerInput}
                onChange={(e) =>
                  handleChangeOptionContentImageUrl(
                    activeSlideIdx,
                    i,
                    e.target.value
                  )
                }
                value={postData.slides[activeSlideIdx - 1].options[i].imageUrl}
              />
            )}
            {postData.slides[activeSlideIdx - 1].options.length > 2 && (
              <span onClick={() => handleDeleteOption(activeSlideIdx, i)}>
                {deleteSVG}
              </span>
            )}
          </div>
        ))}

        {/* <div className={styles.answers}>
          <input
            style={{ width: "1rem" }}
            type="radio"
            name="answer"
            id="answer1"
            onChange={(e) => {
              handleAnswerChange(activeSlideIdx, 1);
            }}
            checked={postData.slides[activeSlideIdx - 1].answerOption === 1}
          />
          <input
            type="text"
            placeholder="text"
            className={styles.answerInput}
          />
        </div> */}

        {postData.slides[activeSlideIdx - 1].options?.length < 4 && (
          <div className={styles.answers}>
            <input
              style={{
                marginLeft: "2rem",
                cursor: "pointer",
                textAlign: "center",
              }}
              type="text"
              placeholder="Add Option"
              readOnly
              onClick={() => handleAddOption(activeSlideIdx)}
              className={styles.answerInput}
            />
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          // backgroundColor: "red",
          bottom: "5rem",
          right: "1.8rem",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "gray",
            fontWeight: "500",
          }}
        >
          Timer
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            // padding: "0.5rem",
          }}
        >
          <button
            onClick={() => handleTimeChange(0)}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
              borderRadius: "6px",
              backgroundColor:
                postData.slides[activeSlideIdx - 1].timer === 0
                  ? "red"
                  : "white",
              border: "none",
              fontSize: "14px",
              padding: "0.2rem 1rem",
              color:
                postData.slides[activeSlideIdx - 1].timer === 0
                  ? "white"
                  : "gray",
              cursor: "pointer",
              transitionDuration: 100,
            }}
          >
            OFF
          </button>
          <button
            onClick={() => handleTimeChange(5)}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
              borderRadius: "6px",
              backgroundColor:
                postData.slides[activeSlideIdx - 1].timer === 5
                  ? "red"
                  : "white",
              border: "none",
              fontSize: "14px",
              padding: "0.2rem 1rem",
              color:
                postData.slides[activeSlideIdx - 1].timer === 5
                  ? "white"
                  : "gray",
              cursor: "pointer",
              transitionDuration: 100,
            }}
          >
            5 sec
          </button>
          <button
            onClick={() => handleTimeChange(10)}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
              borderRadius: "6px",
              backgroundColor:
                postData.slides[activeSlideIdx - 1].timer === 10
                  ? "red"
                  : "white",
              border: "none",
              fontSize: "14px",
              padding: "0.2rem 1rem",
              color:
                postData.slides[activeSlideIdx - 1].timer === 10
                  ? "white"
                  : "gray",
              cursor: "pointer",
              transitionDuration: 100,
            }}
          >
            10 sec
          </button>
        </div>
      </div>
    </div>
  );
};

export const QA = ({
  openCreateQuizModal,
  setOpenCreateQuizModal,
  singleStory,
  setShowComponent,
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(1);
  const [slideCount, setSlideCount] = useState(1);
  const [optionType, setOptionType] = useState("text");

  const [postData, setPostData] = useState({
    slides: [
      {
        question: "",
        optionType: optionType,
        timer: 0,
        options:
          optionType === "textImage"
            ? [
                { text: "", imageUrl: "" },
                { text: "", imageUrl: "" },
              ]
            : [{ text: "" }, { text: "" }],
        answerOption: 1,
      },
    ],
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddSlide = () => {
    setSlideCount(slideCount + 1);
    setActiveSlideIdx(slideCount + 1);
    const newPostData = { ...postData };
    newPostData.slides.push({
      question: "",
      optionType: newPostData.slides[0].optionType,
      timer: 0,
      options:
        optionType === "textImage"
          ? [
              { text: "", imageUrl: "" },
              { text: "", imageUrl: "" },
            ]
          : [{ text: "" }, { text: "" }],
      answerOption: 1,
    });
    setPostData(newPostData);
    if (slideCount >= 1) {
      setShowError(false);
      setErrorMessage("");
    }
  };

  const handleAddOption = (activeSlideIdx) => {
    const newPostData = { ...postData };
    newPostData.slides[activeSlideIdx - 1].options.push(
      optionType === "textImage" ? { text: "", imageUrl: "" } : { text: "" }
    );
    setPostData({ ...newPostData });
  };

  const handleDeleteOption = (activeSlideIdx, optionIdx) => {
    if (postData.slides[activeSlideIdx - 1]?.options?.length <= 1) {
      setShowError(true);
      setErrorMessage("You need to have at least 2 options");
      return;
    }

    const newPostData = { ...postData };
    newPostData.slides[activeSlideIdx - 1].options.splice(optionIdx, 1);
    if (
      newPostData.slides[activeSlideIdx - 1].answerOption >
      newPostData.slides[activeSlideIdx - 1].options.length
    ) {
      newPostData.slides[activeSlideIdx - 1].answerOption = 1;
    }
    setPostData(newPostData);
  };

  const handleSlideClick = (index) => {
    setActiveSlideIdx(index);
  };

  const handleQuestionChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].question = value;
    setPostData(newPostData);
  };

  const handleChangeOptionContentText = (slideIdx, idx, value) => {
    const newPostData = { ...postData };
    newPostData.slides[slideIdx - 1].options[idx].text = value;
    setPostData(newPostData);
  };

  const handleChangeOptionContentImageUrl = (slideIdx, idx, value) => {
    const newPostData = { ...postData };
    newPostData.slides[slideIdx - 1].options[idx].imageUrl = value;
    setPostData(newPostData);
  };

  const handleAnswerChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].answerOption = value;
    setPostData(newPostData);
  };

  const handleSetOptionType = (val) => {
    setOptionType(val);
  };

  const handleOptionTypeChange = (index, value) => {
    setOptionType(value);

    const newPostData = { ...postData };

    const modifiedPostData = newPostData.slides.reduce((acc, obj) => {
      const modifiedObj = {
        ...obj,
        optionType: value,
        options:
          value === "textImage"
            ? [
                { text: "", imageUrl: "" },
                { text: "", imageUrl: "" },
              ]
            : [{ text: "" }, { text: "" }],
      };
      acc.push(modifiedObj);
      return acc;
    }, []);

    setPostData({ slides: modifiedPostData });
    // setOptionType(() => newPostData.slides[0].optionType);
  };

  const handleTimeChange = (value) => {
    const newPostData = { ...postData };

    const modifiedPostData = newPostData.slides.reduce((acc, obj) => {
      const modifiedObj = {
        ...obj,
        timer: value,
      };
      acc.push(modifiedObj);
      return acc;
    }, []);

    setPostData({ slides: modifiedPostData });
  };

  const handleDeleteSlide = (index) => {
    if (slideCount === 1) {
      setShowError(true);
      setErrorMessage("You need to have at least 1 question");
      return;
    }
    if (index === postData.slides.length) {
      setActiveSlideIdx(index - 1);
    }

    const newPostData = { ...postData };
    newPostData.slides.splice(index - 1, 1);

    if (index === activeSlideIdx) {
      setActiveSlideIdx(Math.max(index - 1, 1));
    } else if (index < activeSlideIdx) {
      setActiveSlideIdx(activeSlideIdx - 1);
    }

    setSlideCount(slideCount - 1);
    setPostData(newPostData);
  };

  // console.log("OptionType: " + optionType);
  // console.log(postData);

  return (
    <Modal
      opened={openCreateQuizModal}
      onClose={() => setOpenCreateQuizModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
    >
      <div className={styles.slideForm}>
        <Slide
          slideCount={slideCount}
          activeSlideIdx={activeSlideIdx}
          handleSlideClick={handleSlideClick}
          handleAddSlide={handleAddSlide}
          handleDeleteSlide={handleDeleteSlide}
        />
        <Form
          postData={postData}
          activeSlideIdx={activeSlideIdx}
          handleQuestionChange={handleQuestionChange}
          handleOptionTypeChange={handleOptionTypeChange}
          handleAnswerChange={handleAnswerChange}
          handleSetOptionType={handleSetOptionType}
          handleAddOption={handleAddOption}
          optionType={optionType}
          handleChangeOptionContentText={handleChangeOptionContentText}
          handleChangeOptionContentImageUrl={handleChangeOptionContentImageUrl}
          handleDeleteOption={handleDeleteOption}
          handleTimeChange={handleTimeChange}
        />
      </div>

      {showError && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.btns}>
        <button
          onClick={() => setOpenCreateQuizModal(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button
          onClick={() => setShowComponent(2)}
          className={styles.createQuizBtn}
        >
          Create Quiz
        </button>
      </div>
    </Modal>
  );
};

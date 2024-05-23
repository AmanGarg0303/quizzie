import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      enum: ["QA", "POLL"],
    },
    optionType: {
      type: String,
      enum: ["text", "image", "textImage"],
    },
    timer: {
      type: Number,
      default: 0,
    },
    options: [
      {
        text: String,
        imageUrl: String,
      },
    ],
    impressions: {
      type: Number,
    },
    optedPollOption1: {
      type: Number,
      default: 0,
    },
    optedPollOption2: {
      type: Number,
      default: 0,
    },
    optedPollOption3: {
      type: Number,
      default: 0,
    },
    optedPollOption4: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
    },
    answedCorrectly: {
      type: Number,
    },
    answerdIncorrectly: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("User", questionSchema);
export default Question;

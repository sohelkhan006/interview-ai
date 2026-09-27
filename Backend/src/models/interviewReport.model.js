const mongoose = require("mongoose");

/**
 * - job descreption schema : String
 * - resume text  : String
 * - Self descreption : String
 * - matchScore : Number
 *
 * - Technical questions :
 *          [{
 *          question : "",
 *          intention : "",
 *          answer : "",
 *          }]
 * - Behacioral questions :
 *           [{
 *          question : "",
 *          intention : "",
 *          answer : "",
 *          }]
 * - Skill gaps : [{
 *          skill : "",
 *          severity : {
 *          type : String,
 *          enum : ["low", "medium", "high"]
 *          },
 *          }]
 * - Preparation plan : [{
 *           day : Number,
 *           focus: String,
 *           task : [String]
 * }]
 */

// Sub-schema for technical question
const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

// Sub-Schema for behavioral questions
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

// Sub-Schema for skill gap
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

// Sub-Schema for Preparation plan
const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Dau is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: String,
    required: [true, "Task is required"],
  },
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescreption: {
      type: String,
      required: [true, "Job descreption is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "interviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;

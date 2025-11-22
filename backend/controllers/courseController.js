const User = require("../models/User");
const Course = require("../models/Course");
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openaiUrl = "https://api.openai.com/v1/chat/completions";
const axios = require("axios");
// const pdf = require("pdf-parse");
const pdf = require("pdf-extraction");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBGwR4CqLi3RLKnEg9ev6nGvvN56VylwgM");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    if (!courses) {
      return res.status(404).json({ error: "Courses not found" });
    }

    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCourses = async (req, res) => {
  const userId = req.params.id;
  try {
    // Find user by id and populate courses array
    const user = await User.findById(userId).populate("courses");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ courses: user.courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.assignCourse = async (req, res) => {
  const userId = req.params.id; // from URL
  const { courseId } = req.body; // courseId sent in request body
  try {
    await User.updateOne({ _id: userId }, { $addToSet: { courses: courseId } });
    res.status(200).json({ message: "Course assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.summarizeDoc = async (req, res) => {
  const { pdfUrl } = req.body;
  console.log("Received pdfUrl:", pdfUrl);
  if (!pdfUrl) return res.status(400).json({ error: "Missing pdfUrl" });

  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const dataBuffer = Buffer.from(response.data);
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const prompt = `Summarize the following text briefly:\n\n${text.substring(
      0,
      10000
    )}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize document" });
  }
};

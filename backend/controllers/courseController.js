const User = require("../models/User");
const Course = require("../models/Course");
require("dotenv").config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openaiUrl = "https://api.openai.com/v1/chat/completions";
const pdfParse = require("pdf-parse");
const axios = require("axios");

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
    // Add courseId to user's courses array if not already present
    await User.updateOne({ _id: userId }, { $addToSet: { courses: courseId } });

    res.status(200).json({ message: "Course assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign course" });
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
    const pdfResponse = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });
    const pdfBuffer = Buffer.from(pdfResponse.data, "binary");
    const data = await pdfParse(pdfBuffer);
    console.log("Extracted text length:", data.text.length);
    const text = data.text;

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Summarize the following text briefly:\n\n${text.substring(
          0,
          2000
        )}`,
      },
    ];

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const summary = openaiResponse.data.choices[0].message.content;
    console.log("Generated summary:", summary);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize document" });
  }
};

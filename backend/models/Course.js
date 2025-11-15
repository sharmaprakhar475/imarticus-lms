const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videoLink: { type: String, required: true },
  pdfLink: { type: String },
});

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lectures: [lectureSchema],
  quiz: [{ type: String }],
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  chapters: [chapterSchema],
});

module.exports = mongoose.model("Course", courseSchema);

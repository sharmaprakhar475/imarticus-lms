const mongoose = require("mongoose");
const Course = require("./Course");

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

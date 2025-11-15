const express = require("express");
const router = express.Router();
const {
  getCourses,
  assignCourse,
  courseDetails,
  summarizeDoc,
  getAllCourses,
} = require("../controllers/courseController");

router.get("/", getAllCourses);
router.get("/get-courses/:id", getCourses);
router.post("/assign-course/:id", assignCourse);
router.get("/:courseId", courseDetails);
router.post("/summarize", summarizeDoc);
module.exports = router;

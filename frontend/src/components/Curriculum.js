import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Curriculum() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  const BACKEND_API_URL =
    process.env.BACKEND_API_URL || "http://localhost:5000/api";
  const toggleCourse = (id) => {
    setOpenCourse(openCourse === id ? null : id);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/courses`);
        setCourses(res.data.courses || []);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = async (course) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.put(
        `${BACKEND_API_URL}/courses/assign-course/${userId}`,
        {
          courseId: course._id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (res.data.message) {
        alert("Course assigned successfully!");
      } else {
        alert("Failed to assign course.");
      }
    } catch (err) {
      alert("Error assigning course. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Program Curriculum</h2>
          <p>Loading courses...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Program Curriculum</h2>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="mb-4 text-center fw-bold display-6">
          Program Curriculum
        </h2>

        <div className="horizontal-scroll">
          {courses.map((course) => {
            const lecturesCount = course.chapters?.reduce(
              (acc, ch) => acc + (ch.lectures?.length || 0),
              0
            );

            const quizCount = course.chapters?.reduce(
              (acc, ch) => acc + (ch.quizzes?.length || 0),
              0
            );

            return (
              <div
                className={`course-card-small shadow-sm mb-3 ${
                  openCourse === course._id ? "expanded-small" : ""
                }`}
                key={course._id}
                style={{
                  borderRadius: "14px",
                  background: "#f9fdfc",
                  border: "1px solid #e1ebe8",
                }}
              >
                {/* INLINE HEADER / COLLAPSED VIEW */}
                <div
                  className="d-flex align-items-center justify-content-between p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCourse(course._id)}
                >
                  {/* Course Name */}
                  <div className="fw-bold" style={{ width: "30%" }}>
                    {course.name}
                  </div>

                  {/* Lectures Count */}
                  <div style={{ width: "15%", textAlign: "center" }}>
                    🎥 {lecturesCount}
                  </div>

                  {/* Quiz Count */}
                  <div style={{ width: "15%", textAlign: "center" }}>
                    📝 {quizCount || 0}
                  </div>

                  {/* Assign Button */}
                  <div style={{ width: "20%", textAlign: "center" }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(course);
                      }}
                    >
                      Assign
                    </button>
                  </div>

                  {/* Arrow */}
                  <div style={{ width: "10%", textAlign: "center" }}>
                    <span
                      className={`arrow ${
                        openCourse === course._id ? "rotate" : ""
                      }`}
                      style={{ fontSize: "20px" }}
                    >
                      ❯
                    </span>
                  </div>
                </div>

                {/* EXPANDED DETAILS */}
                {openCourse === course._id && (
                  <div className="p-3 pt-0">
                    <hr />

                    {course.chapters?.map((ch, idx) => (
                      <div
                        key={idx}
                        className="mb-3"
                        style={{
                          padding: "12px",
                          background: "#ffffff",
                          borderRadius: "10px",
                          border: "1px solid #e6e6e6",
                        }}
                      >
                        <strong className="text-success">{ch.name}</strong>

                        <ul className="mt-2">
                          {ch.lectures?.map((lec, i) => (
                            <li key={i}>🎬 {lec.name}</li>
                          ))}

                          {ch.quizzes?.map((q, j) => (
                            <li key={j}>📝 Quiz: {q.title}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

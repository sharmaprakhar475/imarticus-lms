import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [expandedChapterIndex, setExpandedChapterIndex] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`
        );
        setCourse(res.data.course);
      } catch (err) {
        console.error("Failed to fetch course", err);
      }
    }
    fetchCourse();
  }, [courseId]);

  const toggleExpand = (idx) => {
    if (expandedChapterIndex === idx) {
      setExpandedChapterIndex(null);
    } else {
      setExpandedChapterIndex(idx);
    }
  };

  if (!course)
    return (
      <MainLayout pageTitle="Loading...">
        <p>Loading...</p>
      </MainLayout>
    );

  return (
    <MainLayout pageTitle={course.name}>
      <div className="container py-4">
        <h1 className="mb-3">{course.name}</h1>

        <img
          src={course.thumbnail}
          alt={course.name}
          style={{ maxWidth: "200px", width: "100%", borderRadius: "8px" }}
          className="mb-3"
        />

        <p className="lead">{course.description}</p>

        <h3 className="mt-5 mb-4">Chapters</h3>

        <div className="list-group">
          {course.chapters.length === 0 && <p>No chapters available.</p>}

          {course.chapters.map((chapter, idx) => (
            <div key={idx} className="mb-2">
              <button
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={() => toggleExpand(idx)}
              >
                <div>
                  <strong>{chapter.name}</strong>
                </div>
                <div>
                  <small className="text-muted me-3">
                    Lectures: {chapter.lectures.length}
                  </small>
                  <small className="text-muted">
                    Quizzes: {chapter.quiz.length}
                  </small>
                </div>
              </button>

              {expandedChapterIndex === idx && (
                <div className="list-group list-group-flush ms-3 mt-2">
                  {chapter.lectures.length === 0 && (
                    <div className="list-group-item text-muted">
                      No lectures available
                    </div>
                  )}

                  {chapter.lectures.map((lecture, lecIdx) => (
                    <button
                      key={lecIdx}
                      className="list-group-item list-group-item-action"
                      onClick={() =>
                        navigate(
                          `/course/${courseId}/chapter/${idx}/lecture/${lecIdx}`
                        )
                      }
                    >
                      {lecture.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

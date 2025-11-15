import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const BACKEND_API_URL = "https://imarticus-lms-backend-z90i.onrender.com/api";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_API_URL}/courses/get-courses/${userId}`
        );
        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [userId]);
  const navigate = useNavigate();
  return (
    <MainLayout pageTitle="Dashboard">
      <h2 className="mb-4 fw-semibold">My Courses</h2>

      <div className="row g-3">
        {courses.length === 0 && (
          <p className="text-muted">No courses assigned yet.</p>
        )}

        {courses.map((course) => (
          <div className="col-12" key={course._id}>
            <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt={course.name}
                className="rounded"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />

              {/* Course Info */}
              <div className="ms-3 flex-grow-1">
                <h5 className="mb-1 fw-bold">{course.name}</h5>
                <p className="text-muted mb-0">{course.description}</p>
              </div>

              {/* Button */}
              <button
                className="btn btn-success px-4"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

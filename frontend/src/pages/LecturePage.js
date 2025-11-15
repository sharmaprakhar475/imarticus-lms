import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";

export default function LecturePage() {
  const { courseId, chapterIndex, lectureIndex } = useParams();
  const navigate = useNavigate();
  const BACKEND_API_URL = "https://imarticus-lms-backend-z90i.onrender.com/api";
  const [courseName, setCourseName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [lecture, setLecture] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const togglePdf = () => setShowPdf(!showPdf);

  const summarizeDoc = async () => {
    setLoading(true);
    setSummary("");
    try {
      const res = await axios.post(`${BACKEND_API_URL}/summarize`, {
        pdfUrl: lecture.pdfLink,
      });
      setSummary(res.data.summary);
    } catch (error) {
      setSummary("Failed to get summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchLecture() {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/courses/${courseId}`);
        const course = res.data.course;
        setCourseName(course.name);

        const chIndex = parseInt(chapterIndex, 10);
        const lecIndex = parseInt(lectureIndex, 10);

        if (course.chapters && course.chapters[chIndex]) {
          setChapterName(course.chapters[chIndex].name);
          const lec = course.chapters[chIndex].lectures[lecIndex];
          if (lec) {
            setLecture(lec);
          } else {
            setLecture(null);
          }
        } else {
          setChapterName("");
          setLecture(null);
        }
      } catch (err) {
        console.error("Failed to fetch lecture", err);
      }
    }
    fetchLecture();
  }, [courseId, chapterIndex, lectureIndex]);

  if (!lecture)
    return (
      <MainLayout pageTitle="Loading...">
        <p>Loading...</p>
      </MainLayout>
    );

  return (
    <MainLayout pageTitle={`${courseName} - ${chapterName} - ${lecture.name}`}>
      <div className="container py-4">
        <button
          className="btn btn-success mb-3 px-4"
          onClick={() => navigate(-1)}
        >
          &laquo; Back
        </button>

        <h2>{lecture.name}</h2>

        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
            maxWidth: "100%",
            maxHeight: "300px", // Set max height here to shorten video height
          }}
        >
          <iframe
            src={lecture.videoLink}
            title={lecture.name}
            allowFullScreen
            frameBorder="0"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {lecture.pdfLink && (
          <div className="mt-3">
            <button
              className="btn btn-outline-primary me-2"
              onClick={togglePdf}
            >
              {showPdf ? "Hide PDF" : "View PDF"}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={summarizeDoc}
            >
              Summarize Document
            </button>

            {/* PDF iframe */}
            {showPdf && (
              <div className="mt-3" style={{ height: "600px" }}>
                <iframe
                  src={lecture.pdfLink}
                  title="Lecture PDF"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              </div>
            )}

            {/* Inline summary */}
            <div
              className="mt-4 p-3 border rounded"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {loading ? "Loading summary..." : summary}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

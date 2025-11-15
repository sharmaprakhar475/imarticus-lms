import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import LecturePage from "./pages/LecturePage";
import MyCaptainProgram from "./pages/MyCaptainProgram";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-captain-program" element={<MyCaptainProgram />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route
          path="/course/:courseId/chapter/:chapterIndex/lecture/:lectureIndex"
          element={<LecturePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

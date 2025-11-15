const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get(/.*/, (req, res) => {
  // prevent handling API routes
  if (req.originalUrl.startsWith("/api")) return;
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => console.log("Server running on port 5000"));

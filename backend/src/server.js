const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);

app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InterviewIQ Backend Running"
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
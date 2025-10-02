const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB().then(() => {
  console.log("MongoDB connected");

  // Routes
  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/students", require("./routes/studentRoutes"));
  app.use("/api/teachers", require("./routes/teacherRoutes"));
  app.use("/api/classes", require("./routes/classRoutes"));

  // 404 handler
  app.use((req, res) => res.status(404).json({ message: "Route not found" }));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));

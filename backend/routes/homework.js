const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Create uploads directory if not exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Configure multer storage (accept any file type)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// ✅ No file type restrictions — accept everything
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
});

// ✅ Student uploads homework file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("✅ Upload received:", {
      homeworkId: req.body.homeworkId,
      studentName: req.body.studentName,
      className: req.body.className,
      file: req.file.filename,
    });

    res.status(200).json({
      message: "✅ File uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error("❌ File upload error:", err);
    res.status(500).json({ message: "File upload failed" });
  }
});

module.exports = router;

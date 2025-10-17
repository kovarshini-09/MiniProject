// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const Student = require("../models/Student");
// const Teacher = require("../models/Teacher");

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, "secretkey"); // same secret as authRoutes
//     const { id, role } = decoded;

//     let user;
//     if (role === "student") {
//       user = await Student.findById(id).select("-password");
//     } else if (role === "teacher") {
//       user = await Teacher.findById(id).select("-password");
//     } else {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     req.role = role;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Token is invalid or expired" });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");
    const { id, role } = decoded;

    let user;
    if (role === "student") {
      user = await Student.findById(id).select("-password");
    } else if (role === "teacher") {
      user = await Teacher.findById(id).select("-password");
    } else {
      return res.status(401).json({ message: "Unauthorized role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    req.role = role;
    next();
  } catch (err) {
    console.error("❌ Auth Error:", err);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = authMiddleware;

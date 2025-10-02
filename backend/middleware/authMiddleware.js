const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

exports.protect = (allowedRoles) => async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "myscret123");
      let user = await Admin.findById(decoded.id) || await Teacher.findById(decoded.id) || await Student.findById(decoded.id);

      if (!user) return res.status(401).json({ message: "Not authorized" });

      if (!allowedRoles.includes(user.role)) return res.status(403).json({ message: "Forbidden" });

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token invalid" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

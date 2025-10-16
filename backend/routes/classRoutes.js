const express = require("express");
const { getClasses, addClass, latestClass } = require("../controllers/classController");
const router = express.Router();

// Note: Routes are currently public. If you want to restrict them later,
// import and apply the appropriate middleware here.
router.get("/", getClasses);
router.post("/", addClass);
router.get("/latest", latestClass);

module.exports = router;

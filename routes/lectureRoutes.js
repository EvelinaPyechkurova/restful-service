const lectureController = require("../controllers/lectureController");

const express = require("express");
const router = express.Router();

router.get("/", lectureController.getLectureByQueryParams);
router.get("/:id", lectureController.getLectureById);
router.post("/", lectureController.createLecture);
router.patch("/:id", lectureController.updateLecture);
router.delete("/:id", lectureController.deleteLecture);

module.exports = router;
const teacherController = require("../controllers/teacherController");

const express = require("express");
const router = express.Router();

router.get("/", teacherController.getTeachersByQueryParams);
router.get("/:id", teacherController.getTeacherById);
router.post("/", teacherController.createTeacher);
router.patch("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
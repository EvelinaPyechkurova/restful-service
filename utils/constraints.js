const Lecture = require("../models/lectureModel");

async function existLecturesForThisTeacher(id) {
    const lectureCount = await Lecture.countDocuments({ teacher: id });
    return lectureCount > 0;
}

async function existLecturesForThisSubject(id) {
    const lectureCount = await Lecture.countDocuments({ subject: id });
    return lectureCount > 0;
}

module.exports = {
    existLecturesForThisTeacher,
    existLecturesForThisSubject
};
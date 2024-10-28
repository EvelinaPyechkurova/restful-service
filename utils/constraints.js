const Lecture = require("../models/lectureModel");

async function noLecturesForThisTeacher(id){
    return Lecture.find({teacher: id}).length > 0.
}

async function noLecturesForThisSubject(id){
    return Lecture.find({subject: id}).length > 0;
}

module.exports = {
    noLecturesForThisTeacher,
    noLecturesForThisSubject
}
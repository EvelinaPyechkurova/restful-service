const lectureDAO = require("../dao/lectureDAO");
const {validateCreateLecture, validateUpdateLecture} = require("../utils/validators/lectureValidators");

async function getAllLectures(){
    return await lectureDAO.getLectures();
}

async function getLectureById(id){
    return await lectureDAO.getLectureById(id);
}

async function getLecturesBySubject(subject){
    return await lectureDAO.getLecturesBySubject(subject);
}

async function getLecturesByTeacher(teacher){
    return await lectureDAO.getLecturesByTeacher(teacher);
}

async function getLecturesByType(type){
    return await lectureDAO.getLecturesByType(type);
}

async function getLecturesByDate(date){
    return await lectureDAO.getLecturesByDate(date);
}

async function createLecture(lectureData){
    const lectureErrors = validateCreateLecture(lectureData);
    if(lectureErrors)
        throw new Error(lectureErrors);
    
    lectureDAO.createLecture(lectureData);
}

async function updateLecture(id, lectureData){
    const lectureErrors = validateUpdateLecture(lectureData);
    if(lectureErrors)
        throw new Error(lectureErrors);

    lectureDAO.updateLecture(id, lectureData);
}

async function deleteLecture(id){
    lectureDAO.deleteLecture(id);
}

module.exports = {
    getAllLectures,
    getLectureById,
    getLecturesBySubject,
    getLecturesByTeacher,
    getLecturesByType,
    getLecturesByDate,
    createLecture,
    updateLecture,
    deleteLecture
};
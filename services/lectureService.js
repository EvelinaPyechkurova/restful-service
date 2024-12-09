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
    await validateCreateLecture(lectureData);
    lectureDAO.createLecture(lectureData);
}

async function updateLecture(id, lectureData){
    if(await getLectureById(id) === null)
        throw new Error("Invalid data: cannot update non-existing lecture");    
    await validateUpdateLecture(lectureData);
    lectureDAO.updateLecture(id, lectureData);
}

async function deleteLecture(id){
    const result = await lectureDAO.deleteLecture(id);
    if (!result) 
        throw new Error("Lecture not found");

    return {message: "Lecture deleted successfully"};
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
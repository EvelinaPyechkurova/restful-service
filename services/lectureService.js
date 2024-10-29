const lectureDAO = require("../dao/lectureDAO");

async function getAllLectures(){
    try{
        return await lectureDAO.getLectures();
    }catch(error){
        console.log(error.message)
    }
}

async function getLectureById(id){
    try{
        return await lectureDAO.getLectureById(id);
    }catch(error){
        console.log(error.message)
    }
}

async function getLecturesBySubject(subject){
    try{
        return await lectureDAO.getLecturesBySubject(subject);
    }catch(error){
        console.log(error.message)
    }
}

async function getLecturesByTeacher(teacher){
    try{
        return await lectureDAO.getLecturesByTeacher(teacher);
    }catch(error){
        console.log(error.message);
    }
}

async function getLecturesByType(type){
    try{
        return await lectureDAO.getLecturesByType(type);
    }catch(error){
        console.log(error.message);
    }
}


async function getLecturesByDate(date){
    try{
        return await lectureDAO.getLecturesByDate(date);
    }catch(error){
        console.log(error.message);
    }
}

async function createLecture(lectureData){
    try{
        lectureDAO.createLecture(lectureData);
    }catch(error){
        console.log(error.message);
    }
}

async function updateLecture(id, lectureData){
    try{
        lectureDAO.updateLecture(id, lectureData);
    }catch(error){
        console.log(error.message);
    }
}

async function deleteLecture(id){
    try{
        lectureDAO.deleteLecture(id);
    }catch(error){
        console.log(error.message);
    }
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
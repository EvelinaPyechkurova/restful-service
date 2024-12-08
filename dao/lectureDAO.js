const Lecture = require("../models/lectureModel");

// CRUD operations for Lecture

async function getLectures(){
    try{
        return await Lecture.find({});
    }catch (error){
        console.error("Error retrieving all lectures:", error);
        throw error;
    }
}

async function getLectureById(id){
    try{
        return await Lecture.findById(id);
    }catch (error){
        console.error(`Error retrieving lecture by ID ${id}:`, error);
        throw error;
    }
}

async function getLecturesBySubject(subject){
    try{
        return await Lecture.find({subject});
    }catch (error){
        console.error(`Error retrieving lectures by subject ${subject}:`, error);
        throw error;
    }
}

async function getLecturesByTeacher(teacher){
    try{
        return await Lecture.find({teacher});
    }catch (error){
        console.error(`Error retrieving lectures by teacher ${teacher}:`, error);
        throw error;
    }
}

async function getLecturesByType(type){
    try{
        return await Lecture.find({type: new RegExp(`^${type}$`, 'i')});
    }catch (error){
        console.error(`Error retrieving lectures by type ${type}:`, error);
        throw error;
    }
}

async function getLecturesByDate(lectureDate){
    const startOfDay = new Date(lectureDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(lectureDate);
    endOfDay.setHours(23, 59, 59, 999);

    try{
        return await Lecture.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });
    }catch (error){
        console.error(`Error retrieving lectures by date ${lectureDate}:`, error);
        throw error;
    }
}

async function createLecture(lectureData){
    try{
        return await Lecture.create(lectureData);
    }catch (error){
        console.error("Error creating lecture:", error);
        throw error;
    }
}

async function updateLecture(id, lectureData){
    try{
        return await Lecture.findByIdAndUpdate(id, lectureData, {new: true});
    }catch (error){
        console.error(`Error updating lecture with ID ${id}:`, error);
        throw error;
    }
}

async function deleteLecture(id){
    try{
        return await Lecture.findByIdAndDelete(id);
    }catch (error){
        console.error(`Error deleting lecture with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getLectures,
    getLectureById,
    getLecturesBySubject,
    getLecturesByTeacher,
    getLecturesByType,
    getLecturesByDate,
    createLecture,
    updateLecture,
    deleteLecture
};
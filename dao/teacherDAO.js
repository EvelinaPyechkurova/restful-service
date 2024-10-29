const Teacher = require("../models/teacherModel");
const Lecture = require("../models/lectureModel");
const {existLecturesForThisTeacher} = require("../utils/constraints");

// CRUD operations for Teacher

async function getTeachers(){
    try{
        return await Teacher.find({});
    }catch (error){
        console.error("Error retrieving all teachers:", error);
        throw error;
    }
}

async function getTeacherById(id){
    try{
        return await Teacher.findById(id);
    }catch (error){
        console.error(`Error retrieving teacher by ID ${id}:`, error);
        throw error;
    }
}

async function getTeachersByName(name){
    try{
        return await Teacher.find({ name: new RegExp(`^${name}$`, 'i') });
    }catch (error){
        console.error(`Error retrieving teachers by name ${name}:`, error);
        throw error;
    }
}

async function getTeachersBySurname(surname){
    try{
        return await Teacher.find({ surname: new RegExp(`^${surname}$`, 'i') });
    }catch (error){
        console.error(`Error retrieving teachers by surname ${surname}:`, error);
        throw error;
    }
}

async function getTeachersBySubject(subjectId) {
    try {
        const lectures = await Lecture.find({subject: subjectId}).select("teacher");
        const teacherIds = [...new Set(lectures.map(lecture => lecture.teacher))];
        return await Teacher.find({ _id: { $in: teacherIds } });
    } catch (error) {
        console.error(`Error retrieving teachers for subject with ID ${subjectId}:`, error);
        throw error;
    }
}

async function createTeacher(teacherData){
    try{
        return await Teacher.create(teacherData);
    }catch (error){
        console.error("Error creating teacher:", error);
        throw error;
    }
}

async function updateTeacher(id, teacherData){
    try{
        return await Teacher.findByIdAndUpdate(id, teacherData, { new: true });
    }catch (error){
        console.error(`Error updating teacher with ID ${id}:`, error);
        throw error;
    }
}

async function deleteTeacher(id){
    try{
        const hasLectures = await existLecturesForThisTeacher(id);
        if (hasLectures) 
            throw new Error("Cannot delete teacher with associated lectures.");
    
        return await Teacher.findByIdAndDelete(id);
    }catch (error){
        console.error(`Error deleting teacher with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getTeachers,
    getTeacherById,
    getTeachersByName,
    getTeachersBySubject,
    getTeachersBySurname,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
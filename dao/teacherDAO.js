// Data Access Object for Teacher model (interacts with MongoDB)

const Teacher = require("../models/teacherModel");
const {noLecturesForThisTeacher} = require("../utils/constraints/");

// Crud operations for Teacher
async function getTeacherById(id){
    return await Teacher.findById(id);
}

async function createTeacher(teacherData){
    return await Teacher.create(teacherData);
}

async function updateTeacher(id, teacherData){
    return await Teacher.findByIdAndUpdate(id, teacherData, {new: true});
}

async function deleteTeacher(id){
    const hasNoLectures = await noLecturesForThisTeacher(id);
    if(!hasNoLectures)
        throw new Error("Cannot delete teacher with associated lectures.");

    return await Teacher.findByIdAndDelete(id);
}

module.exports = {
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
}
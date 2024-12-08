const teacherDAO = require("../dao/teacherDAO");
const {validateCreateTeacher, validateUpdateTeacher} = require("../utils/validators/teacherValidators");
const {existLecturesForThisTeacher} = require("../utils/constraints");

async function getAllTeachers(){
    return teacherDAO.getTeachers();
}

async function getTeacherById(id){
    return teacherDAO.getTeacherById(id);
}

async function getTeachersByName(name){
    return teacherDAO.getTeachersByName(name);
}

async function getTeachersBySurname(surname){
    return teacherDAO.getTeachersBySurname(surname);
}

async function getTeachersBySubject(type){
    return teacherDAO.getTeachersBySubject(type);
}

async function createTeacher(teacherData){
    const teacherErrors = validateCreateTeacher(teacherData);

    if(teacherErrors)
        throw teacherErrors;

    return await teacherDAO.createTeacher(teacherData);
}

async function updateTeacher(id, teacherData){
    if(await getTeacherById(id) === null)
       throw new Error("Invalid data: cannot update non-existing teacher");

    const teacherErrors = validateUpdateTeacher(teacherData);
    if(teacherErrors)
        throw teacherErrors;

    return await teacherDAO.updateTeacher(id, teacherData);
}

async function deleteTeacher(id){
    const hasLectures = await existLecturesForThisTeacher(id);
    if (hasLectures) 
        throw new Error("Cannot delete teacher with associated lectures.");

    const result = await teacherDAO.deleteTeacher(id);
    if (!result) 
        throw new Error("Teacher not found");

    return {message: "Teacher deleted successfully"};
}

module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeachersByName,
    getTeachersBySurname,
    getTeachersBySubject,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
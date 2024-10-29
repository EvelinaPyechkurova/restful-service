const teacherDAO = require("../dao/teacherDAO");
const {validateCreateTeacher, validateUpdateTeacher} = require("../utils/validators/teacherValidators");
const {existLecturesForThisTeacher} = require("../utils/constraints");

async function getAllTeachers(){
    try{
        return await teacherDAO.getTeachers();
    }catch(error){
        throw error;
    }
}

async function getTeachersById(id){
    try{
        return await teacherDAO.getTeacherById(id);
    }catch(error){
        throw error;
    }
}

async function getTeachersByName(name){
    try{
        return await teacherDAO.getTeachersByName(name);
    }catch(error){
        throw error;
    }
}

async function getTeachersBySurname(surname){
    try{
        return await teacherDAO.getTeachersBySurname(surname);
    }catch(error){
        throw error;
    }
}

async function getTeachersBySubject(type){
    try{
        return await teacherDAO.getTeachersBySubject(type);
    }catch(error){
        throw error;
    }
}

async function createTeacher(teacherData){
    const teacherErrors = validateCreateTeacher(teacherData);

    if(teacherErrors)
        return {error: teacherErrors};
    try{
        return await teacherDAO.createTeacher(teacherData);
    }catch(error){
        throw error;
    }
}

async function updateTeacher(id, teacherData){
    if(await getTeachersById(id) === null)
        return { error: "Invalid data: cannot update non-existing teacher" };

    const teacherErrors = validateUpdateTeacher(teacherData);
    if(teacherErrors)
        return {error: teacherErrors};
    try{
        return await teacherDAO.updateTeacher(id, teacherData);
    }catch(error){
        throw error;
    }
}

async function deleteTeacher(id){
    try{
        const hasLectures = await existLecturesForThisTeacher(id);
        if (hasLectures) 
            throw new Error("Cannot delete teacher with associated lectures.");

        const result = await teacherDAO.deleteTeacher(id);
        if (!result) 
            return {message: "Teacher not found"};

        return {message: "Teacher deleted successfully"};
    }catch (error){
        throw error; 
    }
}

module.exports = {
    getAllTeachers,
    getTeachersById,
    getTeachersByName,
    getTeachersBySurname,
    getTeachersBySubject,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
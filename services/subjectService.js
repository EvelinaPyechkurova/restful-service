const subjectDAO = require("../dao/subjectDAO");
const {validateCreateSubject, validateUpdateSubject} = require("../utils/validators/subjectValidators");
const {existLecturesForThisSubject} = require("../utils/constraints");

async function getAllSubjects(){
    return subjectDAO.getSubjects();    
}

async function getSubjectById(id){
    return subjectDAO.getSubjectById(id);
}

async function getSubjectsByName(name){
    return subjectDAO.getSubjectsByName(name);
}

async function getSubjectsByYear(year){
    return subjectDAO.getSubjectsByYear(year);
}

async function getSubjectsByTrimester(trimester){
    return subjectDAO.getSubjectsByTrimester(trimester);
}

async function getSubjectsByTeacher(id){
    return subjectDAO.getSubjectsByTeacher(id);
}

async function createSubject(subjectData){
    const subjectErrors = validateCreateSubject(subjectData);

    if(subjectErrors)
        throw subjectErrors;

    return await subjectDAO.createSubject(subjectData);
}

async function updateSubject(id, subjectData){
    if(await getSubjectById(id) === null)
       throw new Error("Invalid data: cannot update non-existing subject");

    const subjectErrors = validateUpdateSubject(subjectData);
    if(subjectErrors)
        throw subjectErrors;
    
    return await subjectDAO.updateSubject(id, subjectData);
}

async function deleteSubject(id){
    const hasLectures = await existLecturesForThisSubject(id);
    if (hasLectures) 
        throw new Error("Cannot delete subject with associated lectures.");

    const result = await subjectDAO.deleteSubject(id);
    if (!result) 
        throw new Error("Subject not found");

    return {message: "Subject deleted successfully"};    
}

module.exports = {
    getAllSubjects,
    getSubjectById,
    getSubjectsByName,
    getSubjectsByYear,
    getSubjectsByTrimester,
    getSubjectsByTeacher,
    createSubject,
    updateSubject,
    deleteSubject
};
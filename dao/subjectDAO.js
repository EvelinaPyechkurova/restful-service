const Subject = require("../models/subjectModel");
const {noLecturesForThisSubject} = require("../utils/constraints");

// CRUD operations for Subject

async function getSubjects(){
    try{
        return await Subject.find({});
    }catch (error){
        console.error("Error retrieving all subjects:", error);
        throw error;
    }
}

async function getSubjectById(id){
    try{
        return await Subject.findById(id);
    }catch (error){
        console.error(`Error retrieving subject by ID ${id}:`, error);
        throw error;
    }
}

async function getSubjectsByName(name){
    try{
        return await Subject.find({name});
    }catch (error){
        console.error(`Error retrieving subjects by name ${name}:`, error);
        throw error;
    }
}

async function getSubjectsByYear(year){
    try{
        return await Subject.find({year});
    }catch (error){
        console.error(`Error retrieving subjects by year ${year}:`, error);
        throw error;
    }
}

async function getSubjectsByTrimester(trimester){
    try{
        return await Subject.find({trimester});
    }catch (error){
        console.error(`Error retrieving subjects by trimester ${trimester}:`, error);
        throw error;
    }
}

async function createSubject(subjectData){
    try{
        return await Subject.create(subjectData);
    }catch (error){
        console.error("Error creating subject:", error);
        throw error;
    }
}

async function updateSubject(id, subjectData){
    try{
        return await Subject.findByIdAndUpdate(id, subjectData, {new: true});
    }catch (error){
        console.error(`Error updating subject with ID ${id}:`, error);
        throw error;
    }
}

async function deleteSubject(id) {
    try{
        const hasNoLectures = await noLecturesForThisSubject(id);
        if (!hasNoLectures) 
            throw new Error("Cannot delete subject with associated lectures.");
        
        return await Subject.findByIdAndDelete(id);
    }catch (error){
        console.error(`Error deleting subject with ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getSubjects,
    getSubjectById,
    getSubjectsByName,
    getSubjectsByYear,
    getSubjectsByTrimester,
    createSubject,
    updateSubject,
    deleteSubject
};
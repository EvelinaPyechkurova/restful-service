const teacherService = require("../services/teacherService");
const mongoose = require("mongoose");

async function getTeachersByQueryParams(req, res){
    try{
        const {name, surname, subject} = req.query;
        
        let teacherSet = await teacherService.getAllTeachers();

        if(name){
            const teachersByName = await teacherService.getTeachersByName(name);
            teacherSet = teacherSet.filter(teacher => 
                teachersByName.some(teacherByName => teacherByName._id.equals(teacher._id))
            );
        }

        if(surname){
            const teachersBySurname = await teacherService.getTeachersBySurname(surname);
            teacherSet = teacherSet.filter(teacher => 
                teachersBySurname.some(teachersBySurname => teachersBySurname._id.equals(teacher._id))
            );
        }

        if(subject){
            const teachersBySubject = await teacherService.getTeachersBySubject(subject);
            teacherSet = teacherSet.filter(teacher =>
                teachersBySubject.some(teachersBySubject => teachersBySubject._id.equals(teacher._id)));
        }
       
        res.status(200).json(teacherSet);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function getTeacherById(req, res){
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({error: `${id} is invalid ID address`});
        const teacher = await teacherService.getTeacherById(id);

        if(teacher)
            res.status(200).json(teacher);
        else
            res.status(404).json({error: `teacher with ID ${id} not found`});
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function createTeacher(req, res){
    try{
        const teacher = req.body;
        await teacherService.createTeacher(teacher);
        res.status(201).json({message: "Teacher created successfully"});
    }catch(error){
        res.status(400).json({error: error});
    }
}

async function updateTeacher(req, res){
    try{
        const id = req.params.id;
        const existingTeacher = await teacherService.getTeacherById(id);

        if(!existingTeacher)
            return res.status(404).json({error: `Teacher with ID ${id} not found`});

        const teacher = req.body;
        await teacherService.updateTeacher(id, teacher);
        res.status(200).json({message: "Teacher updated successfully"});
    }catch(error){
        res.status(400).json({error: error});
    }
}

async function deleteTeacher(req, res){
    try{
        const id = req.params.id;
        const existingTeacher = await teacherService.getTeacherById(id);
        if(!existingTeacher)
            return res.status(404).json({error: `Teacher with ID ${id} not found`});

        await teacherService.deleteTeacher(id);
        res.status(200).json({message: "Teacher deleted successfully"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTeachersByQueryParams,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
}
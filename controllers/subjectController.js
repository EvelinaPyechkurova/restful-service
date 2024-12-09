const subjectService = require("../services/subjectService");
const mongoose = require("mongoose");

async function getSubjectsByQueryParams(req, res){
    try{
        const {name, year, trimester, teacher} = req.query;
        
        let subjectSet = await subjectService.getAllSubjects();

        if(name){
            const subjectsByName = await subjectService.getSubjectsByName(name);
            subjectSet = subjectSet.filter(subject => 
                subjectsByName.some(subjectByName => subjectByName._id.equals(subject._id))
            );
        }

        if(year){
            const subjectsByYear = await subjectService.getSubjectsByYear(year);
            subjectSet = subjectSet.filter(subject => 
                subjectsByYear.some(subjectByYear => subjectByYear._id.equals(subject._id))
            );
        }

        if(trimester){
            const subjectsByTrimester = await subjectService.getSubjectsByTrimester(trimester);
            subjectSet = subjectSet.filter(subject =>
                subjectsByTrimester.some(subjectByTrimester => subjectByTrimester._id.equals(subject._id)));
        }

        if(teacher){
            const subjectsByTeacher = await subjectService.getSubjectsByTeacher(teacher);
            subjectSet = subjectSet.filter(subject =>
                subjectsByTeacher.some(subjectByTeacher => subjectByTeacher._id.equals(subject._id)));
        }
       
        res.status(200).json(subjectSet);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function getSubjectById(req, res){
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({error: `${id} is invalid ID address`});
        const subject = await subjectService.getSubjectById(id);

        if(subject)
            res.status(200).json(subject);
        else
            res.status(404).json({error: `subject with ID ${id} not found`});
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function createSubject(req, res){
    try{
        const subject = req.body;
        await subjectService.createSubject(subject);
        res.status(201).json({message: "Subject created successfully"});
    }catch(error){
        res.status(400).json({error});
    }
}

async function updateSubject(req, res){
    try{
        const id = req.params.id;
        const existingSubject = await subjectService.getSubjectById(id);

        if(!existingSubject)
            return res.status(404).json({error: `Subject with ID ${id} not found`});

        const subject = req.body;
        await subjectService.updateSubject(id, subject);
        res.status(200).json({message: "Subject updated successfully"});
    }catch(error){
        res.status(400).json({error});
    }
}

async function deleteSubject(req, res){
    try{
        const id = req.params.id;
        const existingSubject = await subjectService.getSubjectById(id);
        if(!existingSubject)
            return res.status(404).json({error: `Subject with ID ${id} not found`});

        await subjectService.deleteSubject(id);
        res.status(200).json({message: "Subject deleted successfully"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getSubjectsByQueryParams,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
}
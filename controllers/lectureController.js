const lectureService = require("../services/lectureService");
const mongoose = require("mongoose");

async function getLectureByQueryParams(req, res){
    try{
        const {subject, teacher, type, date} = req.query;
        
        let lectureSet = await lectureService.getAllLectures();

        if(subject){
            const lecturesBySubject = await lectureService.getLecturesBySubject(subject);
            lectureSet = lectureSet.filter(lecture => 
                lecturesBySubject.some(lectureBySubject => lectureBySubject._id.equals(lecture._id))
            );
        }

        if(teacher){
            const lecturesByTeacher = await lectureService.getLecturesByTeacher(teacher);
            lectureSet = lectureSet.filter(lecture => 
                lecturesByTeacher.some(lectureByTeacher => lectureByTeacher._id.equals(lecture._id))
            );
        }

        if(type){
            const lecturesByType = await lectureService.getLecturesByType(type);
            lectureSet = lectureSet.filter(lecture =>
                lecturesByType.some(lectureByType => lectureByType._id.equals(lecture._id)));
        }

        if(date){
            const lecturesByDate = await lectureService.getLecturesByDate(date);
            lectureSet = lectureSet.filter(lecture =>
                lecturesByDate.some(lectureByDate => lectureByDate._id.equals(lecture._id)));
        }
       
        res.status(200).json(lectureSet);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function getLectureById(req, res){
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({error: `${id} is invalid ID address`});
        const lecture = await lectureService.getLectureById(id);

        if(lecture)
            res.status(200).json(lecture);
        else
            res.status(404).json({error: `lecture with ID ${id} not found`});
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

async function createLecture(req, res){
    try{
        const lecture = req.body;
        await lectureService.createLecture(lecture);
        res.status(201).json({message: "Lecture created successfully"});
    }catch(error){
        res.status(400).json({error});
    }
}

async function updateLecture(req, res){
    try{
        const id = req.params.id;
        const existingLecture = await lectureService.getLectureById(id);

        if(!existingLecture)
            return res.status(404).json({error: `Lecture with ID ${id} not found`});

        const lecture = req.body;
        await lectureService.updateLecture(id, lecture);
        res.status(200).json({message: "Lecture updated successfully"});
    }catch(error){
        res.status(400).json({error});
    }
}

async function deleteLecture(req, res){
    try{
        const id = req.params.id;
        const existingLecture = await lectureService.getLectureById(id);
        if(!existingLecture)
            return res.status(404).json({error: `Lecture with ID ${id} not found`});

        await lectureService.deleteLecture(id);
        res.status(200).json({message: "Lecture deleted successfully"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getLectureByQueryParams,
    getLectureById,
    createLecture,
    updateLecture,
    deleteLecture
}
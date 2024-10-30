const Subject = require("../../models/subjectModel");
const Teacher = require("../../models/teacherModel");
const {notEmptyString, emptyStringMessage} = require("./teacherValidators");
const mongoose = require("mongoose");

async function validSubject(subject){
    if(!mongoose.Types.ObjectId.isValid(subject))
        return false;
    return !!(await Subject.exists({_id: subject}));
}

const invalidSubjectMessage = "Cannot create lecture for not existing subject";

async function validTeacher(teacher){
    if(!mongoose.Types.ObjectId.isValid(teacher))
        return false;
    return !!(await Teacher.exists({_id: teacher}));
}

const invalidTeacherMessage = "Cannot create lecture for not existing teacher";

function validType(type){
    return notEmptyString(type) && ["theory", "practice"].includes(type);
}

const invalidTypeMessage = "Type of lecture must be either 'theory' or 'practice'";

function validDate(date){
    return date instanceof Date && !isNaN(date.getTime());
}

const invalidDateMessage = "Invalid date format or value";

async function validateCreateLecture(lecture){
    let errors = {};

    if(!lecture || typeof lecture !== "object" || Object.keys(lecture).length !== 4){
        errors.general = "Lecture object is missing or contains an invalid number of fields";
        return errors;
    }

    const {subject, teacher, type, date} = lecture;

    if(!(await validSubject(subject)))
        errors.subject = invalidSubjectMessage;

    if(!(await validTeacher(teacher)))
        errors.teacher = invalidTeacherMessage;

    if(!validType(type))
        errors.type = invalidTypeMessage;

    if(!validDate(date))
        errors.date = invalidDateMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

async function validateUpdateLecture(lecture){
    const allowedFields = ["subject", "teacher", "type", "date"];
    const errors = {};

    const fields = Object.keys(lecture);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ("subject" in lecture && !(await validSubject(lecture.subject)))
        errors.subject = invalidSubjectMessage;

    if ("teacher" in lecture && !(await validTeacher(lecture.teacher)))
        errors.teacher = invalidTeacherMessage;

    if ("type" in lecture && !validType(lecture.type))
        errors.type = invalidTypeMessage;

    if ("date" in lecture && !validDate(lecture.date))
        errors.date = invalidDateMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}


module.exports = {
    validateCreateLecture,
    validateUpdateLecture
}
const {notEmptyString, emptyStringMessage} = require("./teacherValidators");

function validYear(year){
    return year && typeof year === "number" && year >= 1 && year <= 4;
}

const notValidYearMessage = "year must be present, number and in [1, 4]";

function validTrimester(trimester){
    return notEmptyString(trimester) && ["autumn", "spring", "summer"].includes(trimester);
}

const notValidTrimesterMessage = "trimester must be present and be one of values ['autumn', 'spring', 'summer']";

function validateCreateSubject(subject) {
    const errors = {};

    if (!subject || typeof subject !== "object" || Object.keys(subject).length !== 3) {
        errors.general = "Teacher object is missing or contains an invalid number of fields";
        return errors;
    }

    const { name, year, trimester } = subject;

    if (!notEmptyString(name)) 
        errors.name = "Name " + emptyStringMessage;
    if (!validYear(year)) 
        errors.year = notValidYearMessage;
    if (!validTrimester(trimester))
        errors.trimester = notValidTrimesterMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

function validateUpdateSubject(subject) {
    const allowedFields = ["name", "year", "trimester"];
    const errors = {};

    const fields = Object.keys(subject);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ("name" in subject && !notEmptyString(subject.name))
        errors.name = "Name " + emptyStringMessage;

    if ("year" in subject && !validYear(subject.year))
        errors.year = notValidYearMessage;

    if ("trimester" in subject && !validTrimester(subject.trimester))
        errors.trimester = notValidTrimesterMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

module.exports = {
    validateCreateSubject,
    validateUpdateSubject
};
function notEmptyString(str){
    return !null(str) && typeof(str) === "string" && str.trim().length > 0;
}

const emptyStringMessage = "field cannot be empty or consist of only whitespace";

function isPhoneNumber(number) {
    const phoneNumberPattern = /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return notEmptyString(number) && phoneNumberPattern.test(number);
}

const notPhoneNumberMessage = "field is not valid phone number";

function isEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return notEmptyString(email) && emailPattern.test(email);
}

const notEmailMessage = "field is not valid phone email";

function validateCreateTeacher(teacher) {
    const errors = {};

    if (!teacher || typeof teacher !== "object" || Object.keys(teacher).length !== 4) {
        errors.general = "Teacher object is missing or contains an invalid number of fields";
        return errors;
    }

    const { name, surname, phone, email } = teacher;

    if (!notEmptyString(name)) 
        errors.name = "Name " + emptyStringMessage;
    if (!notEmptyString(surname)) 
        errors.surname = "Surname " + emptyStringMessage;
    if (!isPhoneNumber(phone))
         errors.phone = "Phone " + notPhoneNumberMessage;
    if (!isEmail(email)) 
        errors.email = "Email " + notEmailMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

function validateUpdateTeacher(teacher) {
    const allowedFields = ["name", "surname", "phone", "email"];
    const errors = {};

    const fields = Object.keys(teacher);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ("name" in teacher && !notEmptyString(teacher.name))
        errors.name = "Name " + emptyStringMessage;

    if ("surname" in teacher && !notEmptyString(teacher.surname))
        errors.surname = "Surname " + emptyStringMessage;

    if ("phone" in teacher && !isPhoneNumber(teacher.phone))
        errors.phone = "Phone " + notPhoneNumberMessage;

    if ("email" in teacher && !isEmail(teacher.email))
        errors.email = "Email " + notEmailMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

module.exports = {
    notEmptyString,
    emptyStringMessage,
    isPhoneNumber,
    notPhoneNumberMessage,
    isEmail,
    notEmailMessage,
    validateCreateTeacher,
    validateUpdateTeacher
};
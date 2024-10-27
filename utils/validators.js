function notEmptyString(str){
    return !null(str) && typeof(str) === "string" && str.trim().length > 0;
}

const notEmptyStringMessage = "Field cannot consist of only whitespace";

function isPhoneNumber(number) {
    const phoneNumberPattern = /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return notEmptyString(number) && phoneNumberPattern.test(number);
}

const isPhoneNumberMessage = "Field is not valid phone number";

function isEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return notEmptyString(email) && emailPattern.test(email);
}

isEmailMessage = "Field is not valid phone email";

module.exports = {
    notEmptyString, notEmptyStringMessage,
    isPhoneNumber, isPhoneNumberMessage,
    isEmail, isEmailMessage
};
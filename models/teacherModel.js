const mongoose = require("mongoose");
const {notEmptyString,
    emptyStringMessage,
    validPhoneNumber,
    invalidPhoneNumberMessage,
    validEmail,
    invalidEmailMessage
} = require("../utils/validators/teacherValidators");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: notEmptyString,
            message: emptyStringMessage
        }
    },
    surname: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: notEmptyString,
            message: emptyStringMessage
        }
    },
    phone: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: validPhoneNumber,
            message: invalidPhoneNumberMessage
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: validEmail,
            message: invalidEmailMessage
        }
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);
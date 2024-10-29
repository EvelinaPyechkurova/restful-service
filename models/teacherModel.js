const mongoose = require("mongoose");
const {notEmptyString,
    emptyStringMessage,
    isPhoneNumber,
    notPhoneNumberMessage,
    isEmail,
    notEmailMessage
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
            validator: isPhoneNumber,
            message: notPhoneNumberMessage
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: notEmailMessage
        }
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);
const mongoose = require("mongoose");
const {notEmptyString,
    notEmptyStringMessage,
    isPhoneNumber,
    isPhoneNumberMessage,
    isEmail,
    isEmailMessage
} = require("../utils/validators");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: notEmptyString,
            message: notEmptyStringMessage
        }
    },
    surname: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: notEmptyString,
            message: notEmptyStringMessage
        }
    },
    phone: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: isPhoneNumber,
            message: isPhoneNumberMessage
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: isEmailMessage
        }
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);
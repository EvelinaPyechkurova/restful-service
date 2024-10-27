const mongoose = require("mongoose");
const {notEmptyString,
     notEmptyStringMessage,
} = require("../utils/validators");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for lecture"],
        lowercase: true,
        minlength: 2,
        maxlength: 50,
        validate: {
            validator: notEmptyString,
            message: notEmptyStringMessage
        }
    },
    year: {
        type: Number,
        required: [true, "Year is required for lecture"],
        min: 1,
        max: 4
    },
    trimester: {
        type: String,
        required: [true, "Trimester is required for lecture"],
        enum: ["autumn", "spring", "summer"]
    }
});

module.exports = mongoose.model("Subject", subjectSchema);
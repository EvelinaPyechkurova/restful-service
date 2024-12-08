const mongoose = require("mongoose");
const {TRIMESTER_TYPE_VALUES} = require("../utils/constants");
const {
    notEmptyString,
    emptyStringMessage,
} = require("../utils/validators/subjectValidators");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for subject"],
        lowercase: true,
        minlength: 2,
        maxlength: 50,
        validate: {
            validator: notEmptyString,
            message: emptyStringMessage
        }
    },
    year: {
        type: Number,
        required: [true, "Year is required for subject"],
        min: 1,
        max: 4
    },
    trimester: {
        type: String,
        required: [true, "Trimester is required for subject"],
        enum: TRIMESTER_TYPE_VALUES
    }
});

module.exports = mongoose.model("Subject", subjectSchema);
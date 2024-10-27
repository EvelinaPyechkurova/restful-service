const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Subject is required for lecture"]
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Teacher is required for lecture"]
    },
    type: {
        type: String,
        required: [true, "Type is required for lecture"],
        enum: ["theory", "practice"]
    },
    date: {
        type: Date,
        required: [true, "Date is required for lecture"]
    }
});

module.exports = mongoose.model("Lecture", lectureSchema);
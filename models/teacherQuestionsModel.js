var mongoose = require('mongoose')

const teacherQuestionModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    className: {
        type: String, required: true
    },
    chapter: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        required: true
    }], 
    school: {
        type: mongoose.Types.ObjectId,
        required: true
    },
})

module.exports = mongoose.model('teacherQuestion', teacherQuestionModel);

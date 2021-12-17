var mongoose = require('mongoose')

const resultModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    inCorrect: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }, 
    selectedAnswer: {
        type: Object,
        required: true
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        required: true
    }],
    type:{
        type: String,
        required: true
    },
    exam: {
        type: String, required: true
    },
    unattempted: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('resultModel', resultModel);

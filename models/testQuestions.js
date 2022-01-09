var mongoose = require('mongoose')

const testQuestions = new mongoose.Schema({
    questionText: {
        type: String,
    },
    subject: {
        type: String
    },
    className: {
        type: String
    },
    options: {
        type: Array,  
        required: false
    },
    chapter: {
        type: String,
    },
    solution: {
        type: String,
    },
    correctAnswer: {
        type: String,
    },
    questionImage: {
        type: String
    },
    exam: {
        type: String,
         required: true
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('testQuestions', testQuestions);

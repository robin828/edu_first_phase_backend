var mongoose = require('mongoose')

const questionModel = new mongoose.Schema({
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
    image: {
        type: String
    },
    exam: {
        type: String,
         required: true
    }
})

module.exports = mongoose.model('questionModel', questionModel);

var mongoose = require('mongoose')

const chemAnswerModel = new mongoose.Schema({
    standard: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    questionId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    // isAnswerChecked: {
    //     type: Boolean,
    //     required: true
    // },
    selectedOption: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

})

module.exports = mongoose.model('chemAnswerModel', chemAnswerModel);

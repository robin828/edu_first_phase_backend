var mongoose = require('mongoose')

const bioAnswerModel = new mongoose.Schema({
    standard: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    questions: {
        type: Object,
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

module.exports = mongoose.model('bioAnswerModel', bioAnswerModel);

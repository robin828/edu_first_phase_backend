var mongoose = require('mongoose')

const testModel = new mongoose.Schema({
    exam: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    syllabus: {
        type: Array,
        required: true
    },
    className: {
        type: String, 
        required: true
    },
    // chapter: {
    //     type: String,
    //     required: true
    // },
    Date: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        // required: true
    }], 
    school: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('testModel', testModel);

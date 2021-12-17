var mongoose = require('mongoose')

const classModel = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    exams: [{
        type: mongoose.Types.ObjectId, ref: 'ExamModel' 
    }]
})

module.exports = mongoose.model('classModel', classModel);

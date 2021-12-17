var mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'schoolModel'
    },
    classTeacher: {
        type: String,
        required: true
    },
    subjectTeacher: {
        type: Array,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    givenQuestion: {
        Date: {
            type: Date
        },
        chapter: {
            type: String, 
        },
        className: {
            type: String, 
        },
        questions: [{
            type: mongoose.Types.ObjectId,
            ref: 'questionModel'
        }]
    },
    phoneNumber: {
        type: Number,
        match: [/^\d{10}$/, 'Invalid phone'],
        required: true
    }
})

module.exports = mongoose.model('teacher', teacherSchema);


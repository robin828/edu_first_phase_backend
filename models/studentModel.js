var mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'schoolModel'
    },
    standard: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    stream: {
        type: String,
        required: false
    },
    teacherQuestion: {
        type: Array,   
        date: {
            type: Date
        },
        result: {
            type: mongoose.Types.ObjectId,
            ref: 'resultModel'
        }
    },
    platformQuestion: { 
        type: Array,   
        date: {
            type: Date
        },
        result: {
            type: mongoose.Types.ObjectId,
            ref: 'resultModel'
        }
    },
    schoolResult: {
        type: Array
    }
})

module.exports = mongoose.model('student', studentSchema);


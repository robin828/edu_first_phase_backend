var mongoose = require('mongoose')

const announceModel = new mongoose.Schema({
    teacher: {
        type: String,
        ref: 'teacherModel'
    },
    announcementText: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('announcement', announceModel);

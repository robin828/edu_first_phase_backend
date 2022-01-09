var mongoose = require('mongoose')

const schoolModel = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerEmailId: {
        type: String,
        // required: true,
    },
    ownerNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    students: {
        type: Array
    }
})

module.exports = mongoose.model('school', schoolModel);

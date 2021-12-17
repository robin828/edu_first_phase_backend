var mongoose = require('mongoose')

const schoolModel = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('school', schoolModel);

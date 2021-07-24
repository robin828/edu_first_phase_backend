var mongoose = require('mongoose')

const studentSchoolResultModel = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'studentModel',
        required: true
    },
    
    
})

module.exports = mongoose.model('studentSchoolResultModel', studentSchoolResultModel);

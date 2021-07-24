var mongoose = require('mongoose')

const examModel = new mongoose.Schema({
    examName: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true
    },
    questions: [{
        type: mongoose.Types.ObjectId, ref: 'questionModel' 
    }],
     className: {
         type:String,
         rrequired: true
     }
})

module.exports = mongoose.model('examModel', examModel);

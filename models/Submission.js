const mongoose = require('mongoose')
const {Schema} = mongoose
const Exercise = require('./Exercise')

const SubmissionSchema= new Schema({
    // link to the exercise being answered
    // connect submission with exercise
    exercise:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'exercise',
        required:true
    },
    // link to the student who submitted the exercise
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    answer:{type:String,required:true},
    grade:{type:Number,default:null},
    feedback:{type:String , default:''},
    submittedAt: {type:Date , default: Date.now}
})
const Submission = mongoose.model('submission',SubmissionSchema)

module.exports = Submission
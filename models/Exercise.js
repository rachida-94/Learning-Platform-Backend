const mongoose = require('mongoose')
const {Schema} = mongoose
const User = require('./User')
const exerciseSchema= new Schema(
    {
    title:{
        type:String,
        required:true,
        
    }, 
    description:{
        type:String,
        required:true
    },
    
    teacher:{ //Reference to the teacher who created the exercise also connects the exercise with User(teacher)
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    

},{timestamps:true}
)
const Exercise = mongoose.model('exercise',exerciseSchema)

module.exports = Exercise
const User = require ('../models/User')
const Exercise =require('../models/Exercise')
const Submission = require('../models/Submission')


// admin get all Users
async function getAllUsers(req,res){
    try {
        const users = await User.find().select('-password')  // get the user details without password
         res.json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function updateUserRole(req,res){
try {
    const user = await User.findByIdAndUpdate(req.params.userId)
    if(!user) return res.status(404).json({message:'User not found'})
        
       res.json({message:'User role updated'})  
} catch (error) {
    res.status(500).json()
}
}

async function deleteUser(req,res){
 try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId)
    if (!deletedUser)
        return res.status(400).json({error:'User not found'})
    res.json({message:'User deleted successfully'})
 } catch (error) {
    res.status(500).json({error:error.message})
 }   
}

async function getAllExercises(req,res){
    try {
        const exercises = await Exercise.find().populate("teacher","username email")
        res.json(exercises)

    } catch (error) {
        res.status.json({error:error.message})
    }
}

async function deleteExercise(req,res){
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.exerciseId)
        if(!deletedExercise)
         return res.status(404).json({error:'Exercise not found'})
        res.json({message:'Exercise deleted successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function getAllSubmissions(req,res){
    try {
        const submissions = await Submission.find().populate('student','username')
        res.json(submissions)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async function deleteSubmission(req,res){
   try { 
    const deletedSubmission = await Submission.findByIdAndDelete(req.params.submissionId)
    if (!deletedSubmission)
        return res.status(404).json({error:'No submission found'})
    res.json({message:'Submission deleted successfully'})
   } catch (error) {
    res.status(500).json({ error:error.message})
   } 
}

module.exports={getAllUsers,updateUserRole,deleteUser,deleteExercise,getAllExercises,getAllSubmissions,deleteSubmission}

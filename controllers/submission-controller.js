const Submission = require ('../models/Submission')
const Exercise = require ('../models/Exercise')

async function createSubmission (req,res){ // student can submit the exercise
    try {
        if(req.user.role !== 'student')
            return res.status(403).json({message:'Only students can submit answers'})
       
        const {exerciseId,answer} = req.body
        const exercise = await Exercise.findById(exerciseId)
        if(!exercise)
            return res.status(400).json({error:'Exercise not found'})

        const submission = new Submission({
            exercise:exerciseId,
            student:req.user._id,
            answer
        })
        submission.save()
        res.status(200).json(submission)
 } 
    
    catch (error) {
        res.status(500).json({error:error.message})
    }
}

// Teacher get  students submissions for the exercise they
// 


async function getSubmissionsByExercise(req,res){
    try {
       const exercise= await Exercise.findById(req.params.exerciseId)
       if(!exercise) 
        return res.status(400).json({error:'Exercise not found'})
    // Only the teacher who created the exercise can see the submission 
    if(req.user.role !== 'teacher'|| exercise.teacher.equals(req.user._id))
        return res.status(403).json({error:'not authorized to see the submission'})

       const submissions = await Submission.find({exercise:req.params.exerciseId}).populate('student','username')//we use populate to get the student details
       res.status(200).json(submissions)
    } catch (error) {
       res.status(500).json({error:error.message}) 
    }
}

// teacher can graded the exercise that they created
async function gradeSubmission(req,res){
    try {
        if(req.user.role !== 'teacher')
        return res.status(403).json({error:"Not authorized only teachers can grade the exercise"})
        const { grade,feedback} = req.body
        const submission = await Submission.findById(req.params.id).populate("exercise")
        if(!submission)
            return res.status(400).json({error:'Submission not found'})
        //Only the teacher who created the exercise can grade
        if(!submission.exercise.teacher.equals(req.user._id))
            return res.status(403).json({error:'Not authorized to grade this submission'})
        submission.grade = grade
        submission.feedback = feedback
        await submission.save()
        res.json({message:'Submission graded successfully',submission})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function getMySubmissionsById(req,res){
    try {
        const submission= await Submission.findById(req.params.id)
        if(!submission)
            return res.status(400).json({error:'submission not found'})
        if(!submission.student.equals(req.user._id))
            return res.status(403).json({error:'You only access your submission'})
        res.json(submission)
    } catch (error) {
       res.status(500).json({error:error.message}) 
    }
}

async function getSubmissions(req,res){
    try {const submissions = await Submission.find({student:req.user._id}).populate('exercise','title description')
    res.json(submissions)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports= {createSubmission,getSubmissionsByExercise,getMySubmissionsById,gradeSubmission,getSubmissions}
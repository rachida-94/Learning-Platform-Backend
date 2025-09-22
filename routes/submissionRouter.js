const express = require('express')
router = express.Router()
const verifyAuthentication=require('../middleware/auth-middleware')

const submissionController = require ('../controllers/submission-controller')

router.get('/',verifyAuthentication,submissionController.getSubmissions)
router.post('/:exerciseId',verifyAuthentication,submissionController.createSubmission)
router.get('/:id',verifyAuthentication,submissionController.getMySubmissionsById)
router.get('/exercise/:exerciseId',verifyAuthentication,submissionController.getSubmissionsByExercise)
router.put('/:id/grade',verifyAuthentication,submissionController.gradeSubmission)

module.exports = router
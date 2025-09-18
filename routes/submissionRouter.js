const express = require('express')
router = express.Router()
const verifyAuthentication=require('../middleware/auth-middleware')
const checkRole = require ('../middleware/role-middleware')
const submissionController = require ('../controllers/submission-controller')

router.get('/',verifyAuthentication,submissionController.getSubmissions)
router.post('/:exerciseId',verifyAuthentication,submissionController.createSubmission)
router.get('/:id',verifyAuthentication,submissionController.getMySubmissionsById)
router.get('/exercise/:exerciseId',checkRole,verifyAuthentication,submissionController.getSubmissionsByExercise)
router.put('/:id/grade',verifyAuthentication,checkRole,submissionController.gradeSubmission)

module.exports = router
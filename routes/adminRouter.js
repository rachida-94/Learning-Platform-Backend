const express = require('express')
const router = express.Router()
const verifyAuthentication = require('../middleware/auth-middleware')
const adminOnly = require ('../middleware/admin-middleware')
const adminController = require ('../controllers/adminController')

router.get('/users',verifyAuthentication,adminOnly,adminController.getAllUsers)
router.put('/users/:userId/role',verifyAuthentication,adminOnly,adminController.updateUserRole)
router.delete('/users/:userId',verifyAuthentication,adminOnly,adminController.deleteUser)

router.get('/exercises',verifyAuthentication,adminOnly,adminController.getAllExercises)
router.delete('/exercises/:exerciseId',verifyAuthentication,adminOnly,adminController.deleteExercise)

router.get('/submissions',verifyAuthentication,adminOnly,adminController.getAllSubmissions)
router.delete('/submissions/:submissionId',verifyAuthentication,adminOnly,adminController.deleteSubmission)

module.exports = router
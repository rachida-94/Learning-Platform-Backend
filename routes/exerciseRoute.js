const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exercise-controller')
const checkRole = require('../middleware/role-middleware')
const verifyAuthentication = require('../middleware/auth-middleware')


router.get('/',verifyAuthentication,exerciseController.getExercises)
router.get('/:id',verifyAuthentication,exerciseController.getExerciseById)

//teachers only routes
router.post('/',verifyAuthentication,exerciseController.createExercise)
router.put("/:id",verifyAuthentication,exerciseController.updateExercise)
router.delete('/:id',verifyAuthentication,exerciseController.deleteExercise)

module.exports=router

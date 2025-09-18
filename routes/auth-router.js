const express = require ('express')
const authoController = require ('../controllers/auth-controller')
const verifyAuthentication= require ('../middleware/auth-middleware')
const adminOnly = require ('../middleware/admin-middleware')

const router = express.Router()

router.get('/',verifyAuthentication,authoController.getUser)
router.get('/admin',verifyAuthentication,adminOnly,authoController.getUser)
router.post('/register',authoController.registerUser)
router.post('/login',authoController.loginUser)

module.exports = router
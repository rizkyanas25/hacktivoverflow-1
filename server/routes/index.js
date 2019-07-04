const router = require('express').Router()
const userController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')
const questionRoute = require('./question')
const jobRoute = require('./job')
router.get('/', (req, res) => {res.status(200).json({message: 'Home'})})

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', authenticate, userController.getUserData)
router.patch('/users', authenticate, userController.updateTag)

router.use('/jobs', jobRoute)

router.use('/questions', questionRoute)

module.exports = router
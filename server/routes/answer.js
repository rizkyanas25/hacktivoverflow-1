const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const { authenticate, authorizeAnswer } = require('../middlewares/auth')


// router.use("/:answerId", authorizeAnswer)

router.post('/', AnswerController.addAnswer)
router.get('/:answerId', AnswerController.findAnswer)
router.patch('/:answerId', AnswerController.updateAnswer)
router.patch('/:answerId/upvote', AnswerController.upVote)
router.patch('/:answerId/downvote', AnswerController.downVote)
router.delete('/:answerId', AnswerController.deleteAnswer)
module.exports = router
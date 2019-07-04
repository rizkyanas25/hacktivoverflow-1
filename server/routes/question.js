const router = require('express').Router()
const QuestionController = require('../controllers/question')
const AnswerRoute = require('./answer')
const AnswerController = require('../controllers/answer')
const { authenticate, authorizeQuestion, authorizeAnswer } = require('../middlewares/auth')

router.get('/', QuestionController.findAllQuestions)
router.get('/tags', QuestionController.findTags)
router.get('/:questionId', QuestionController.findQuestion)
router.get('/:questionId/answers', AnswerController.findAllAnswers)

router.use(authenticate)

router.get('/', QuestionController.findAllQuestions)
router.post('/', QuestionController.createQuestion)
router.patch('/:questionId', authorizeQuestion, QuestionController.updateQuestion)
router.patch('/:questionId/upvote', QuestionController.upVote)
router.patch('/:questionId/downvote', QuestionController.downVote)
router.delete('/:questionId', authorizeQuestion, QuestionController.deleteQuestion)

router.post('/:questionId/answers', AnswerController.addAnswer)
router.get('/:questionId/answers/:answerId', AnswerController.findAnswer)
router.patch('/:questionId/answers/:answerId', authorizeAnswer, AnswerController.updateAnswer)
router.patch('/:questionId/answers/:answerId/upvote', AnswerController.upVote)
router.patch('/:questionId/answers/:answerId/downvote', AnswerController.downVote)
router.delete('/:questionId/answers/:answerId', authorizeAnswer, AnswerController.deleteAnswer)

module.exports = router




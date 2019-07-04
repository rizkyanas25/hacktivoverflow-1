const Answer = require('../models/answer')

class AnswerController {
  static addAnswer (req, res, next) {
    let newAnswer = {
      content: req.body.content,
      questionId: req.params.questionId,
      userId: req.loggedUser._id,
      voteUp: [],
      voteDown: [],
    }
    Answer
      .create(newAnswer)
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(next)
  }

  static findAllAnswers (req, res, next) {
    Answer
      .find({questionId: req.params.questionId})
      .populate('userId')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static findAnswer (req, res, next) {
    Answer
      .findById(req.params.answerId)
      .populate('userId')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static updateAnswer (req, res, next) {
    let setVal = {}
    req.body.content && (setVal.content = req.body.content)
    Answer
    .findById(req.params.answerId)
      .then(answer =>{
          answer.set(setVal)
          return answer.save()
      })
      .then(updated =>{
          res.status(200).json(updated)
      })
      .catch(next)
  }

  static deleteAnswer (req, res, next) {
    Answer
      .deleteOne({_id : req.params.answerId})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    Answer
      .findById(req.params.answerId)
      .then(data => {
        if (data.voteDown.indexOf(req.loggedUser._id) !== -1) {
          return Answer.findByIdAndUpdate(req.params.answerId, {
            $pull: {voteDown: req.loggedUser._id}
          })       
        } 
        else if (data.voteUp.indexOf(req.loggedUser._id) === -1) {
          return Answer.findByIdAndUpdate(req.params.answerId, {
            $push: {voteUp: req.loggedUser._id}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static downVote(req, res, next) {
    Answer
      .findById(req.params.answerId)
      .then(data => {
        if (data.voteUp.indexOf(req.loggedUser._id) !== -1) {
          return Answer.findByIdAndUpdate(req.params.answerId, {
            $pull: {voteUp: req.loggedUser._id}
          })       
        } 
        else if (data.voteDown.indexOf(req.loggedUser._id) === -1) {
          return Answer.findByIdAndUpdate(req.params.answerId, {
            $push: {voteDown: req.loggedUser._id}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }
}

module.exports = AnswerController
const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionController {
  static createQuestion (req, res, next) {
    let newQuestion = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      userId: req.loggedUser._id,
      voteUp: [],
      voteDown: [],
      viewers: [],
      solved: false
    }
    Question
      .create(newQuestion)
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static findAllQuestions (req, res, next) {
    Question
      .find({}, {}, {
        sort: {
          _id: -1
        }
      })
      .populate('userId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static filterByTag (req, res, next) {
    console.log(req.query.tags)
    Question
      .find({
        tags: { $in: req.query.tags }
      })
      .populate('userId')
      .then(filtered => {
        res.status(200).json(filtered)
      })
      .catch(next)
  }

  static findQuestion (req, res, next) {
    Question
      .findById(req.params.questionId)
      .populate('userId')
      .then(data => {
        if (req.loggedUser) {
          if (data.viewers.indexOf(req.loggedUser._id) === -1) {
            
            return Question.findByIdAndUpdate(req.params.questionId, {
              $push: {viewers: req.loggedUser._id}
            })
          } else {
            return data
          }
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteQuestion (req, res, next) {
    Question
      .deleteOne({_id :req.params.questionId})
      .then(data => {
        return data
      })
      .then(data => {
        return Answer.deleteMany({questionId: req.params.questionId})
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateQuestion(req, res, next) {
    let setVal = {}
    req.body.title && (setVal.title = req.body.title) 
    req.body.content && (setVal.content = req.body.content)
    req.body.tags && (setVal.tags = req.body.tags)
    Question
    .findById(req.params.questionId)
      .then(question =>{
          question.set(setVal)
          return question.save()
      })
      .then(updated =>{
          res.status(200).json(updated)
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    Question
      .findById(req.params.questionId)
      .then(data => {
        if (data.voteDown.indexOf(req.loggedUser._id) !== -1) {
          return Question.findByIdAndUpdate(req.params.questionId, {
            $pull: {voteDown: req.loggedUser._id}
          })       
        } 
        else if (data.voteUp.indexOf(req.loggedUser._id) === -1) {
          return Question.findByIdAndUpdate(req.params.questionId, {
            $push: {voteUp: req.loggedUser._id}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static downVote(req, res, next) {
    Question
      .findById(req.params.questionId)
      .then(data => {
        if (data.voteUp.indexOf(req.loggedUser._id) !== -1) {
          return Question.findByIdAndUpdate(req.params.questionId, {
            $pull: {voteUp: req.loggedUser._id}
          })       
        } 
        else if (data.voteDown.indexOf(req.loggedUser._id) === -1) {
          return Question.findByIdAndUpdate(req.params.questionId, {
            $push: {voteDown: req.loggedUser._id}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findTags (req, res, next) {
    Question
      .find({})
      .then(questions => {
        let tags = []
        questions.forEach(question => {
          question.tags.forEach(tag => {
            tags.push({key: '', value: tag})
          })
        })
        res.status(200).json(tags)
      })
      .catch(next)
  }
}

module.exports = QuestionController
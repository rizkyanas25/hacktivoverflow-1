const { verify } = require('../helpers/jwt')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')



module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      throw {code: 401, msg: 'You must login to access this endpoint'}
    } else {
      try {
        let decoded = verify(token);
        req.loggedUser = decoded
      } catch (err) {
        throw {code: 400, msg: 'Session Expired'}
      }
      User
        .findOne({
        _id: req.loggedUser._id
        })
        .then(user => {
          if(user) {
            req.loggedUser = user;
            next();
          } else {
            throw {code: 401, msg: 'User is not valid'} 
         }
       })
       .catch(next)
    }
  },

  authorizeQuestion: function(req, res, next) {
    Question
      .findOne({ _id: req.params.questionId })
      .then(question => {
        console.log(question)
        if(`${question.userId}` == `${req.loggedUser._id}`) {
          next()
        } else {
          res.status(401).json({ msg: 'Unauthorized' })
        }
      })
      .catch(next)
  },

  authorizeAnswer: function(req, res, next) {
    console.log(req.params.questionId)
    console.log(req.params.answerId)
    Answer
      .findOne({ _id: req.params.answerId })
      .then(answer => {
        console.log(answer)
        if(`${answer.userId}` == `${req.loggedUser._id}`) {
          next()
        } else {
          res.status(401).json({ msg: 'Unauthorized' })
        }
      })
      .catch(next)
  }
}

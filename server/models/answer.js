const mongoose = require('mongoose')

let answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'question',
    required: [true, 'questionId Required']
  },
  content: {
    type: String,
    required: [true, 'content Required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
    required: [true, 'userId Required']
  },
  voteUp: {
    type: [String]
  },
  voteDown: {
    type: [String]
  }
}, {timestamps: true})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
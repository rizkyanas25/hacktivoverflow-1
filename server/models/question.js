const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title Required']
  },
  content: {
    type: String,
    required: [true, 'Content Required']
  },
  tags: [{
    type: String,
    required: [true, 'Tags required']
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
    required: [true, 'UserId Required']
  },
  voteUp: {
    type: [String]
  },
  voteDown: {
    type: [String]
  },
  viewers: {
    type: [String]
  },
  solved: {
    type: Boolean
  }
}, {timestamps: true})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
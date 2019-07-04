const router = require('express').Router()
const axios = require('axios')

router.get('/', function (req, res, next) {
  axios.get('https://jobs.github.com/positions.json')
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(next)
})

module.exports = router
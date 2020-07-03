const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.render('index', {
    title: 'my express app',
    message: 'Hello',
  })
})

module.exports = router

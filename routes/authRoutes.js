const router = require('express').Router(),
  { register, login } = require('../handlers/authHandlers')

router.post('/register', register)
router.post('/login', login)

module.exports = router
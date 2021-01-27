const jwt = require('jsonwebtoken')

function jwtGenerator(id, name, profileImageUrl) {
  const payload = {
    id, name, profileImageUrl
  }
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' })
}

module.exports = jwtGenerator
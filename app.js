const mongo_utils = require('./mongo_utils')

mongo_utils.connectToServer((err, client) => {
  if (err) console.log('db connect error: ', err)

  const express = require('express'),
    app = express()

  app.listen(5000, () => {
    console.log('server on port 5000')
  })
})

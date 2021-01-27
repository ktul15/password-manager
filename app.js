const mongo_utils = require('./mongo_utils')

mongo_utils.connectToServer((err, client) => {
  if (err) console.log('db connect error: ', err)

  const express = require('express'),
    app = express(),
    authRoutes = require('./routes/authRoutes'),
    tempRoutes = require('./routes/tempRoutes'),
    errorHandler = require('./handlers/error')

  require('dotenv').config()

  // middlwares
  app.use(express.urlencoded({ extended: true }))

  //ROUTES

  //auth routes
  app.use('/auth', authRoutes)

  // temp. routes
  app.use('/', tempRoutes)

  // if none of my routes reached, then handle error
  app.use((req, res, next) => {
    let err = new Error('Not found')
    err.status = 404
    next(err)
  })

  app.use(errorHandler)

  app.listen(5000, () => {
    console.log('server on port 5000')
  })
})

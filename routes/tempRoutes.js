const router = require('express').Router(),
  mongo_utils = require('../mongo_utils'),
  userCollection = mongo_utils.getCollection()

router
  .get('/', async (req, res) => {
    // get-all
    userCollection.find().toArray((err, result) => {
      res.json(result)
    })
  })
  .delete('/delete/:name', async (req, res) => {
    // delete-one
    const deletedUser = await userCollection.deleteOne({ name: req.params.name })
    res.json(deletedUser)
  })
  .delete('/delete', async (req, res) => {
    // delete-all
    const deletedUser = await userCollection.deleteMany()
    res.json(deletedUser)
  })

module.exports = router
const mongo_utils = require('../mongo_utils'),
  userCollection = mongo_utils.getCollection()

module.exports.getOneUser = async function (name) {
  const result = await userCollection.find({ name: name })
  return result
}